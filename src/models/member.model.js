import mongoose from "mongoose";

export const MEMBER_FIELDS = ["name", "designation"];

const memberSchema = new mongoose.Schema({
  name: { type: String },
  designation: { type: String },
});

export const Member = mongoose.model("members", memberSchema);
