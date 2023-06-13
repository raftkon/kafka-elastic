import kafkaClient from "../config/kafkaConfig.js";
const TOPIC = "test-01";

async function sendMessages(req, res) {
  const messages = req.body.data
    ? req.body.data
    : [
        {
          key: "key-12",
          value: "I am a head without a body!",
        },
      ];
  await kafkaClient.produce(TOPIC, messages);
  res.status(200).json({
    status: "OK",
    message: "Message successfully send!",
  });
}

// * Kafka Consumer
kafkaClient.consume(TOPIC, (value) => {
  console.log(value);
});

export default {
  sendMessages,
};
