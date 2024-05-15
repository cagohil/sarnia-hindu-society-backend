const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventsSchema = new Schema({
  title: {
    type: String,
  },
  eventimage: {
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
});

module.exports = mongoose.model("events", EventsSchema);
