import express from "express";
import KafkaConfig from "./KafkaConfig.js";

const TOPIC = "test-01";
const kafkaConfig = new KafkaConfig();

const PORT = 3000;
const app = express();

app.get("/api/kafka", async (req, res) => {
  try {
    const messages = [
      {
        key: "key-1",
        value: "This is a message to kafka!",
      },
    ];

    await kafkaConfig.produce(TOPIC, messages);
    res.status(200).json({
      status: "OK",
      message: "Message successfully send!",
    });
  } catch (error) {
    console.log("***There is an error writing to kafka: ", error);
  }
});

// * Consumer
kafkaConfig.consume(TOPIC, (value) => {
  console.log(value);
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
