import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
});

export const Image = mongoose.model("images", imageSchema);
