import elasticClient from "../config/elasticConfig.js";
import earthquakeModel from "../models/earthquake.model.js";

async function getIndices(req, res) {
  const allIndices = await elasticClient.indices.get({
    index: "*",
  });
  res.send(Object.keys(allIndices));
}

async function createIndex(req, res) {
  const { index } = req.query;
  const result = await elasticClient.indices.create(
    {
      index,
      mappings: {
        properties: earthquakeModel.mapping,
      },
    },
    { ignore: [400] }
  );
  if (result.error) {
    console.log(result.error);
  }
  res.send(result);
}

async function deleteIndex(req, res) {
  const { index } = req.query;
  const result = await elasticClient.indices.delete({
    index,
  });
  res.send(result);
}

async function getIngestPipeline(req, res) {
  const result = await elasticClient.ingest.getPipeline({
    id: earthquakeModel.pipeline.id,
  });
  res.send(result);
}

async function createIngestPipeline(req, res) {
  const result = await elasticClient.ingest.putPipeline(
    earthquakeModel.pipeline
  );
  res.send(result);
}

async function deleteIngestPipeline(req, res) {
  const { pipelineID } = req.query;
  const result = await elasticClient.ingest.deletePipeline({
    id: pipelineID,
  });
  res.send(result);
}

export default {
  createIndex,
  createIngestPipeline,
  deleteIndex,
  deleteIngestPipeline,
  getIngestPipeline,
  getIndices,
};
