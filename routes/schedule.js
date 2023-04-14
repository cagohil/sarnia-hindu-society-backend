const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Schedule = require("../models/Schedule");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the schedule using: GET "api/schedules/fetchallschedule"
router.get("/fetchallschedule", async (req, res) => {
  try {
    const schedule = await Schedule.find({ schedule: req.body.id });
    res.json(schedule);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new schedule using: POST "api/schedules/addschedule"
router.post(
  "/addschedule",
  fetchadmin,
  [
    body("title", "Enter a table"),
    body("time" ,"Enter a time"),
  ],
  async (req, res) => {
    try {
      const { title, time} = req.body;
      //if there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const schedule = new Schedule({
        title,
        time,
      });

      const saveschedule = await schedule.save();

      res.json(saveschedule);
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing schedule using: PUT "api/schedules/updateschedule"
router.put("/updateschedule/:id", fetchadmin, async (req, res) => {
  try {
    const { title, time} = req.body;
    //Create a newSchedule object
    const newSchedule = {};
    if (title) {
      newSchedule.title = title;
    }
    if (time) {
      newSchedule.time = time;
    }

    //Find the note to be updated and update it
    let schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).send("Not Found");
    }

    // if(schedule.admin.toString() !== req.admin.id){
    //     return res.status(401).send("Not Allowed");
    // }

    schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { $set: newSchedule },
      { new: true }
    );

    res.json({ schedule });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing schedule using: DELETE "api/schedules/deleteschedule"
router.delete("/deleteschedule/:id", fetchadmin, async (req, res) => {
  try {
    //Find the note to be deleted and delete it
    let schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).send("Not Found");
    }

// Allow deletion only if admin owen this Note
    // if(schedule.admin.toString() !== req.admin.id){
    //     return res.status(401).send("Not Allowed");
    // }

    schedule = await Schedule.findByIdAndDelete(req.params.id);

    res.json({ Success: "schedule has been deleted", schedule: schedule });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
