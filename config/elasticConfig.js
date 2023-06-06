import { Client } from "@elastic/elasticsearch";

console.log(process.env.ELASTICSEARCH_HOST);
const client = new Client({
  node: process.env.ELASTICSEARCH_HOST,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

client
  .ping()
  .then((res) => console.log("You are connected to Elasticsearch"))
  .catch((err) => console.error("Elasticsearch is not connected", err));

export default client;
