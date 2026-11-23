import mongoose from "mongoose";

export const SCHEDULE_FIELDS = ["title", "time"];

const scheduleSchema = new mongoose.Schema({
  title: { type: String },
  time: { type: String },
});

export const Schedule = mongoose.model("schedules", scheduleSchema);
