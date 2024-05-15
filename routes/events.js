const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Events = require("../models/Events");
const { body, validationResult } = require("express-validator");
const multer = require("multer");


// ROUTE 1: Get all the Events using: GET "api/events/fetchallevents"
router.get("/fetchallevents", async (req, res) => {
  try {
    const events = await Events.find({ events: req.body.id });
    res.json(events);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});



// ROUTE 2: Add a new event using: POST "api/events/addevent"
router.post(
  "/addevent",
  fetchadmin,
  [
    body("title", "Enter a title"),
    body("eventimage", "choose image"),
    body("description", "Enter a description"),
    body("time" ,"Enter a time"),
    body("date", "Enter a date"),
    body("address", "Enter a address"),
  ],
  async (req, res) => {
    try {
      const { title, description, time, date, address} = req.body;
      //if there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const events = new Events({
        title,
        description,
        time,
        date,
        address,
      });

      const saveevents = await events.save();

      res.send(saveevents);
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 3: Update an existing event using: PUT "api/events/updateevent"
router.put("/updateevent/:id", fetchadmin, async (req, res) => {
  try {
    const { title, description, time, date, address} = req.body;
    //Create a newEvent object
    const newEvents = {};
    if (title) {
      newEvents.title = title;
    }
    if (description) {
      newEvents.description = description;
    }
    if (time) {
      newEvents.time = time;
    }
    if (date) {
      newEvents.date = date;
    }
    if (address) {
      newEvents.address = address;
    }

    //Find the note to be updated and update it
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
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});



// ROUTE 4: Delete an existing event using: DELETE "api/events/deleteevent"
router.delete("/deleteevent/:id", fetchadmin, async (req, res) => {
  try {
    //Find the note to be deleted and delete it
    let events = await Events.findById(req.params.id);
    if (!events) {
      return res.status(404).send("Not Found");
    }

// Allow deletion only if admin owen this Note
    // if(events.admin.toString() !== req.admin.id){
    //     return res.status(401).send("Not Allowed");
    // }

    events = await Events.findByIdAndDelete(req.params.id);

    res.json({ Success: "event has been deleted", events: events });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
