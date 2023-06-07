import bodyParser from "body-parser";
import express from "express";
import catchAsync from "../lib/catchAsync.js";
import kafkaControllers from "../controllers/kafka.controllers.js";

const router = express.Router();

router.post("/", bodyParser.json(), catchAsync(kafkaControllers.sendMessages));

export default router;
