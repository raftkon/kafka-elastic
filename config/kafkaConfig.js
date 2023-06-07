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
