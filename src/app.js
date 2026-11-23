import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

// Images in /resources are shown on the frontend (another origin), so allow cross-origin loading.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: env.corsOrigin === "*" ? true : env.corsOrigin.split(",").map((o) => o.trim()) }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
if (env.nodeEnv !== "production") app.use(morgan("dev"));

app.use("/resources", express.static(env.uploadDir));

app.get("/", (req, res) => {
  res.send("Sarnia Hindu Society Backend Running!");
});

// Make sure the database is connected before any API request is handled.
app.use("/api", async (req, res, next) => {
  await connectDB();
  next();
});
app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
