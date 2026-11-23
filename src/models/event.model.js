const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventsSchema = new Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    eventimage: {
      // preset crest icon key ("deepa" | "dandiya") or a full image URL
      type: String,
    },
    description: {
      type: String,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    address: {
      type: String,
    },
    link: {
      // ticket / registration URL (e.g. Zeffy)
      type: String,
    },
    buttonText: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", EventsSchema);
