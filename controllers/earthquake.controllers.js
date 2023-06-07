import elasticClient from "../config/elasticConfig.js";
import earthquakeModel from "../models/earthquake.model.js";
import helperFunctions from "../lib/helperFunctions.js";

async function getAllDocs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 50,
    track_total_hits: true, //* TO GET ALL RESULTS
  });
  res.json(result);
}

async function getDocById(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    query: {
      match: {
        _id: req.params.id,
      },
    },
  });
  res.json(result);
}

async function getMapping(req, res) {
  await elasticClient.indices.refresh({
    index: earthquakeModel.name,
  });
  const result = await elasticClient.indices.getMapping({
    index: earthquakeModel.name,
  });
  res.send(result);
}

async function createDoc(req, res) {
  const result = await elasticClient.index({
    index: earthquakeModel.name,
    document: {
      time: Math.floor(Date.now()),
      place: "mikro mou Argostoli",
      url: "www.ena-url.gr",
      detail: "www.allo-ena-url.gr",
      title: "Titlos eimai o Titlos",
      depth: 123.4,
      latitude: 23,
      longitude: -23,
    },
    pipeline: earthquakeModel.pipeline.id,
  });
  await elasticClient.indices.refresh();
  res.send(result);
}

async function bulkDocuments(req, res) {
  const data = helperFunctions.readJSON("./data.json");
  const operations = helperFunctions
    .transformEarthquakeData(data)
    .flatMap((doc) => [{ index: { _index: earthquakeModel.name } }, doc]);
  const result = await elasticClient.bulk({
    refresh: true,
    operations,
    pipeline: earthquakeModel.pipeline.id,
  });
  const count = await elasticClient.count({ index: earthquakeModel.name });
  console.log(count);
  res.send(result);
}

async function updateDoc(req, res) {
  const { id } = req.params;
  const result = await elasticClient.update({
    index: earthquakeModel.name,
    id,
    doc: {
      title: req.body.title,
    },
  });
  console.log(result);
  res.json(result);
}

async function removeAllDocs(req, res) {
  const result = await elasticClient.deleteByQuery({
    index: earthquakeModel.name,
    query: {
      match_all: {},
    },
  });
  res.json(result);
}

async function removeDocById(req, res) {
  const { id } = req.params;
  const result = await elasticClient.delete({
    index: earthquakeModel.name,
    id,
  });
  res.json(result);
}

// ********* AGGREGATIONS *********

async function getMaxAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      "highest-depth": {
        max: {
          field: "depth",
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getStatsAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      all_stats_depth: {
        stats: {
          field: "depth",
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getCardinalityAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      unique_depth: {
        cardinality: {
          field: "depth",
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getDateHistogramAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      earthquakes_per_day: {
        date_histogram: {
          field: "@timestamp",
          fixed_interval: "1d",
          order: {
            _key: "desc",
          },
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getHistogramAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      earthquakes_per_depth: {
        histogram: {
          field: "depth",
          interval: 15,
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getRangeAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      earthquakes_per_custom_depth_ranges: {
        range: {
          field: "depth",
          ranges: [
            {
              to: 50,
            },
            {
              from: 50,
              to: 200,
            },
            {
              from: 200,
            },
          ],
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getTermsAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      top_5_earthquake_depths: {
        terms: {
          field: "depth",
          size: 5,
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

async function getPipelineAggs(req, res) {
  const result = await elasticClient.search({
    index: earthquakeModel.name,
    size: 0,
    aggs: {
      earthquakes_per_day: {
        date_histogram: {
          field: "@timestamp",
          fixed_interval: "1d",
        },
        aggs: {
          average_depth: {
            avg: {
              field: "depth",
            },
          },
        },
      },
    },
  });
  console.log(result);
  res.json(result);
}

export default {
  getAllDocs,
  getDocById,
  getMapping,
  createDoc,
  bulkDocuments,
  updateDoc,
  removeAllDocs,
  removeDocById,
  getMaxAggs,
  getStatsAggs,
  getCardinalityAggs,
  getDateHistogramAggs,
  getHistogramAggs,
  getHistogramAggs,
  getRangeAggs,
  getTermsAggs,
  getPipelineAggs,
};
