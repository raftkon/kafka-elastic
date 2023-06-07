import express from "express";
import catchAsync from "../lib/catchAsync.js";
import earthquakeControllers from "../controllers/earthquake.controllers.js";

const router = express.Router();

router.get("/", catchAsync(earthquakeControllers.getAllDocs));

router.get("/mapping", catchAsync(earthquakeControllers.getMapping));

router.get("/bulk", catchAsync(earthquakeControllers.bulkDocuments));

router.get("/:id", catchAsync(earthquakeControllers.getDocById));

router.post("/", catchAsync(earthquakeControllers.createDoc));

router.put("/:id", catchAsync(earthquakeControllers.updateDoc));

router.delete("/", catchAsync(earthquakeControllers.removeAllDocs));

router.delete("/:id", catchAsync(earthquakeControllers.removeDocById));

router.get("/aggs/metric/max", catchAsync(earthquakeControllers.getMaxAggs));

router.get(
  "/aggs/metric/stats",
  catchAsync(earthquakeControllers.getStatsAggs)
);

router.get(
  "/aggs/metric/cardinality",
  catchAsync(earthquakeControllers.getCardinalityAggs)
);

router.get(
  "/aggs/bucket/date",
  catchAsync(earthquakeControllers.getDateHistogramAggs)
);

router.get(
  "/aggs/bucket/hist",
  catchAsync(earthquakeControllers.getHistogramAggs)
);

router.get(
  "/aggs/bucket/range",
  catchAsync(earthquakeControllers.getRangeAggs)
);

router.get(
  "/aggs/bucket/terms",
  catchAsync(earthquakeControllers.getTermsAggs)
);

router.get("/aggs/pipeline", catchAsync(earthquakeControllers.getPipelineAggs));

export default router;
