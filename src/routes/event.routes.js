import { Router } from "express";
import { body } from "express-validator";
import { createEvent, deleteEvent, listEvents, updateEvent } from "../controllers/event.controller.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/fetchallevents", listEvents);
router.post("/addevent", requireAdmin, body("title", "Enter a title").trim().notEmpty(), validate, createEvent);
router.put("/updateevent/:id", requireAdmin, updateEvent);
router.delete("/deleteevent/:id", requireAdmin, deleteEvent);

export default router;
