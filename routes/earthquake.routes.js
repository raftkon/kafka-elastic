import express from "express";
import catchAsync from "../lib/catchAsync.js";
import earthquakeControllers from "../controllers/earthquake.controllers.js";

const router = express.Router();
// const earthquakeControllers = require("../controllers/earthquake.controllers");

router.get("/", catchAsync(earthquakeControllers.getAllDocs));

router.get("/mapping", catchAsync(earthquakeControllers.getMapping));

router.get("/bulk", catchAsync(earthquakeControllers.bulkDocuments));

router.get("/:id", catchAsync(earthquakeControllers.getDocById));

router.post("/", catchAsync(earthquakeControllers.createDoc));

router.put("/:id", catchAsync(earthquakeControllers.updateDoc));

router.delete("/", catchAsync(earthquakeControllers.removeAllDocs));

router.delete("/:id", catchAsync(earthquakeControllers.removeDocById));

router.get("/aggs/metric/max", catchAsync(earthquakeControllers.getMax));

router.get("/aggs/metric/stats", catchAsync(earthquakeControllers.getStats));

router.get(
  "/aggs/metric/cardinality",
  catchAsync(earthquakeControllers.getCardinality)
);

router.get(
  "/aggs/bucket/date",
  catchAsync(earthquakeControllers.getDateHistogram)
);

router.get("/aggs/bucket/hist", catchAsync(earthquakeControllers.getHistogram));

router.get("/aggs/bucket/range", catchAsync(earthquakeControllers.getRange));

router.get("/aggs/bucket/terms", catchAsync(earthquakeControllers.getTerms));

router.get("/aggs/pipeline", catchAsync(earthquakeControllers.getPipeline));

export default router;
