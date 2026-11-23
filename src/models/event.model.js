import mongoose from "mongoose";

export const EVENT_FIELDS = [
  "title",
  "subtitle",
  "eventimage", // preset crest icon key ("deepa" | "dandiya" | "logo") or a full image URL
  "description",
  "time",
  "date",
  "address",
  "link", // ticket / registration URL (e.g. Zeffy)
  "buttonText",
];

const eventSchema = new mongoose.Schema(
  Object.fromEntries(EVENT_FIELDS.map((field) => [field, { type: String }])),
  { timestamps: true }
);

export const Event = mongoose.model("events", eventSchema);
