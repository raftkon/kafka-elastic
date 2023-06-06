import { Kafka } from "kafkajs";
class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka01",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async produce(topic, messages) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.producer.disconnect();
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topics: [topic], fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          callback(message.value.toString());
        },
      });
      await this.consumer.seek({ topic, offset: 0, partition: 0 });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new KafkaConfig();
// const { Kafka } = require("kafkajs");

// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["localhost:9092"],
// });

// const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: "test-group" });

// const run = async () => {
//   // Producing
//   await producer.connect();
//   await producer.send({
//     topic: "quickstart-events",
//     messages: [{ value: "Hello KafkaJS user!" }],
//   });

//   // Consuming
//   await consumer.connect();
//   await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         partition,
//         offset: message.offset,
//         value: message.value.toString(),
//       });
//     },
//   });
// };

// run().catch(console.error);
