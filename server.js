import "dotenv/config";
import express from "express";
import cors from "cors";
import kafkaRoutes from "./routes/kafka.routes.js";
import elasticRoutes from "./routes/elastic.routes.js";
import earthquakeRoutes from "./routes/earthquake.routes.js";

const PORT = 3000;
const app = express();

app.use("/api/elastic", elasticRoutes);
app.use("api/earthquakes", earthquakeRoutes);
app.use("/api/kafka", kafkaRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The app is working!");
});

app.use((err, req, res, next) => {
  console.log("***HIJACKING THE EXPRESS DEFAULT ERROR HANDLER***");
  next(err);
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
