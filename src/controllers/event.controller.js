import { Event, EVENT_FIELDS } from "../models/event.model.js";
import { notFound } from "../utils/httpError.js";
import { pick } from "../utils/pick.js";

// GET /api/events/fetchallevents  (newest first)
export const listEvents = async (req, res) => {
  res.json(await Event.find().sort({ _id: -1 }));
};

// POST /api/events/addevent
export const createEvent = async (req, res) => {
  const event = await Event.create(pick(req.body, EVENT_FIELDS));
  res.send(event);
};

// PUT /api/events/updateevent/:id
export const updateEvent = async (req, res) => {
  const events = await Event.findByIdAndUpdate(
    req.params.id,
    { $set: pick(req.body, EVENT_FIELDS) },
    { returnDocument: "after" }
  );
  if (!events) throw notFound();
  res.json({ events });
};

// DELETE /api/events/deleteevent/:id
export const deleteEvent = async (req, res) => {
  const events = await Event.findByIdAndDelete(req.params.id);
  if (!events) throw notFound();
  res.json({ Success: "event has been deleted", events });
};
