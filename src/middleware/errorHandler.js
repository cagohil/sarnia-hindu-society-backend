import mongoose from "mongoose";
import { HttpError } from "../utils/httpError.js";

export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
};

// Express 5 forwards rejected promises from async handlers here automatically.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json(err.body ?? { error: err.message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).send("Not Found");
  }
  console.error(err);
  return res.status(500).send("Internal Server Error");
};
