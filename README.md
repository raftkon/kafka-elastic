# Elastic-Kafka

Before you start the NodeJS server, you have to start the docker containers first. The reason why
the are not all the services in one **docker-compose** is because Elasticsearch has to provide the
appropriate credentials in order to connect with Kibana. These credentials aren't provided if you start
all the services with docker-compose.

For this reason you have to start Elasticsearch & Kibana on their own and Kafka & Zookeeper in a docker-compose.

## Elasticsearch & Kibana

Start Elasticsearch & Kibana containers by running the following commands:

- Start Elasticsearch

```bash
docker run --name elasticsearch-01 --net elastic -p 9200:9200 docker.elastic.co/elasticsearch/elasticsearch:8.7.0
```

- Start Kibana

```bash
docker run --name kibana-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.0
```

## Kafka & Zookeeper

Start Kafka & Zookeeper containers by running the following command in the root directory:

```bash
docker-compose up -d
```

## ExpressJS

After running the appropriate containers, run the command:

```bash
npm start
```
