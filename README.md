# Kafka-Elastic

An ExpressJS server with Kafka and Elastic integrations. The server needs some configuration in order to communicate properly with Elasticsearch and Kafka.

## Create custom network

First of all, create a custom network for all the docker containers. Name the custom network whatever you want, we are going to name it _kafka-elastic_.

```bash
docker network create kafka-elastic
```

## Run containers

The docker-compose.yml file in the root directory containes all the necessary containers. Run the command:

```bash
docker compose -p kafka-elastic up -d
```

### Elasticsearch

The first time you run the Elasticsearch container, a password is generated for the _elastic_ user and output to the logs, plus an enrollment token for enrolling Kibana.

**In case there are no password and enrollment token**, we have to generate them manually. The default user in elasticsearch is _elastic_.

We need the _password_ so we can connect from Express server and from Kibana. To generate a new password run the command:

```bash
docker exec -it elasticsearch bin/elasticsearch-reset-password -u elastic
```

If you encounter a problem about not finding the script, replace _bin/elasticsearch-reset-password_ with _/usr/share/elasticsearch/bin/elasticsearch-reset-password_ which is the full path of the script.

To generate a new _enrollment token_ in order to enroll to Kibana, run the command:

```bash
docker exec -it elasticsearch bin/elasticsearch-create-enrollment-token -s kibana
```

Save the password and the enrollment token to a file.

### Kibana

The first time you run the Kibana container you have to enroll to Kibana. You have the enrollment token from the previous step, so navigate to your browser to **localhost:5601** and provide the enrolmment key.

After that an alert will popup asking for a verification code from Kibana. To generate the verification code run the command:

```bash
docker exec -it kibana bin/kibana-verification-code
```

If you encounter a problem about not finding the script, replace _bin/kibana-verification-code_ with _/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token_ which is the full path of the script.

After entering the verification code it should prompt you to enter usename and password to enter Kibana. If it doesn't automatically prompt you, then you can refresh the page. As mentioned, the _default username_ is **elastic** the _password_ is the one that was generated in the _Elasticsearch_ step.

## Start ExpressJS server

Every container now should run properly, so the next step is to configure the expressJS server so that it can communicate with Elasticsearch and Kafka containers.

Create a **.env** file and enter the following parameters:

```

ELASTICSEARCH_USERNAME="elastic"
ELASTICSEARCH_PASSWORD="password generated"
ELASTICSEARCH_HOST="https://elasticsearch:9200"

KAFKA_CLIENT_ID="kafka01"
KAFKA_BROKER="kafka:9092"

```

Provide the password generated in the `ELASTICSEARCH_PASSWORD` parameter. In `ELASTICSEARCH_HOST` the url should match to the name of the container, e.g. if you name the container _es-01_, the parameter should be `https://es-01:9200`. In our case, in the `docker-compose.yml` file, we named the container _elasticsearch_ and the port we expose is _9200_. Similarly, the `KAFKA_BROKER` parameter should have the name of the container and the port specified in the docker-compose.yml. The `KAFKA_CLIENT_ID` can be whatever you want.

### Build docker image

In order to build the docker image, navigate to the server directory where the _Dockerfile_ lives and run the command:

```bash
docker build -t express --no-cache .
```

That should build a docker image under the name **express**, you can name your image any name you like.

### Run the ExpressJS container

Now that we have the docker image, we run the container by running the command:

```bash
docker run -p 3000:3000 --name express --net kafka-elastic express
```

## Last notes

And it's done, you now should have 5 containers running, 4 from the _docker compose_ (Elasticsearch, Kibana, Kafka, Zookeeper) and another one for the ExpressJS server.

To stop the containers, you should first stop the ExpressJS server by running the command:

```bash
docker stop express
```

To stop the rest of the containers, run the command:

```bash
docker compose -p kafka-elastic stop
```

To start again the same containers and avoid creating new ones so you don't have to go through the same configuration steps, first start the _kafka-elastic_ containers:

```bash
docker compose -p kafka-elastic start
```

Then start the ExpressJS server by running the command:

```bash
docker start express
```
