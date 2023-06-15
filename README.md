# Elastic-Kafka

Before you start the NodeJS server, you have to start the docker containers first. The reason why
they are not all the services in one **docker-compose** is because Elasticsearch has to provide the
appropriate credentials in order to connect with Kibana. These credentials aren't provided if you start
all the services with docker-compose.

For this reason you have to start Elasticsearch & Kibana on their own and Kafka & Zookeeper in a docker-compose.

## Create custom network

First of all, create a custom network for all the docker containers. Name the custom network whatever you want, we are going to name it _kafka-elastic_.

```bash
docker network create kafka-elastic
```

## Elasticsearch & Kibana

Start Elasticsearch & Kibana containers amd connect them to _kafka-elastic_ network by running the following commands:

- Start Elasticsearch

```bash
docker run --name elasticsearch --net kafka-elastic -p 9200:9200 docker.elastic.co/elasticsearch/elasticsearch:8.7.0
```

- Start Kibana

```bash
docker run --name kibana --net kafka-elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.0
```

## Kafka & Zookeeper

Start Kafka & Zookeeper containers by running the following command in the root directory:

```bash
docker compose -p kafka-zookeeper up -d
```

## ExpressJS

After running the appropriate containers, run the command:

```bash
npm start
```
