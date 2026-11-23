import { Schedule, SCHEDULE_FIELDS } from "../models/schedule.model.js";
import { notFound } from "../utils/httpError.js";
import { pick } from "../utils/pick.js";

export const listSchedules = async (req, res) => {
  res.json(await Schedule.find());
};

export const createSchedule = async (req, res) => {
  res.json(await Schedule.create(pick(req.body, SCHEDULE_FIELDS)));
};

export const updateSchedule = async (req, res) => {
  const schedule = await Schedule.findByIdAndUpdate(
    req.params.id,
    { $set: pick(req.body, SCHEDULE_FIELDS) },
    { returnDocument: "after" }
  );
  if (!schedule) throw notFound();
  res.json({ schedule });
};

export const deleteSchedule = async (req, res) => {
  const schedule = await Schedule.findByIdAndDelete(req.params.id);
  if (!schedule) throw notFound();
  res.json({ Success: "schedule has been deleted", schedule });
};
