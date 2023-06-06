import express from "express";
import kafkaClient from "../config/kafkaConfig.js";
const router = express.Router();
const TOPIC = "test-01";

router.post("/", async (req, res) => {
  const messages = [
    {
      key: "key-1",
      value: "This is a message to kafka!",
    },
  ];

  await kafkaClient.produce(TOPIC, messages);
  res.status(200).json({
    status: "OK",
    message: "Message successfully send!",
  });
});

// * Kafka Consumer
kafkaClient.consume(TOPIC, (value) => {
  console.log(value);
});
export default router;
