import express from "express";
import catchAsync from "../lib/catchAsync.js";
import elasticControllers from "../controllers/elastic.controllers.js";

const router = express.Router();

router.get("/", catchAsync(elasticControllers.getIndices));

router.get("/ingestPipeline", catchAsync(elasticControllers.getIngestPipeline));

router.post(
  "/ingestPipeline",
  catchAsync(elasticControllers.createIngestPipeline)
);

router.delete(
  "/ingestPipeline",
  catchAsync(elasticControllers.deleteIngestPipeline)
);

router.post("/", catchAsync(elasticControllers.createIndex));

router.delete("/", catchAsync(elasticControllers.deleteIndex));

export default router;
