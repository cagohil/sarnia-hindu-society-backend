const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Events = require("../models/Events");
const { body, validationResult } = require("express-validator");

const EVENT_FIELDS = [
  "title",
  "subtitle",
  "eventimage",
  "description",
  "time",
  "date",
  "address",
  "link",
  "buttonText",
];

const pickEventFields = (source) => {
  const data = {};
  EVENT_FIELDS.forEach((field) => {
    if (source[field] !== undefined) {
      data[field] = typeof source[field] === "string" ? source[field].trim() : source[field];
    }
  });
  return data;
};

// ROUTE 1: Get all the Events using: GET "api/events/fetchallevents" (newest first)
router.get("/fetchallevents", async (req, res) => {
  try {
    const events = await Events.find({}).sort({ _id: -1 });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new event using: POST "api/events/addevent"
router.post(
  "/addevent",
  fetchadmin,
  [body("title", "Enter a title").trim().notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const events = new Events(pickEventFields(req.body));
      const saveevents = await events.save();

      res.send(saveevents);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing event using: PUT "api/events/updateevent/:id"
router.put("/updateevent/:id", fetchadmin, async (req, res) => {
  try {
    const newEvents = pickEventFields(req.body);

    let events = await Events.findById(req.params.id);
    if (!events) {
      return res.status(404).send("Not Found");
    }

    events = await Events.findByIdAndUpdate(
      req.params.id,
      { $set: newEvents },
      { new: true }
    );

    res.json({ events });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing event using: DELETE "api/events/deleteevent/:id"
router.delete("/deleteevent/:id", fetchadmin, async (req, res) => {
  try {
    let events = await Events.findById(req.params.id);
    if (!events) {
      return res.status(404).send("Not Found");
    }

    events = await Events.findByIdAndDelete(req.params.id);

    res.json({ Success: "event has been deleted", events: events });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
