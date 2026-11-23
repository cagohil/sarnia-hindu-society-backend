import { Router } from "express";
import {
  createSchedule,
  deleteSchedule,
  listSchedules,
  updateSchedule,
} from "../controllers/schedule.controller.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/fetchallschedule", listSchedules);
router.post("/addschedule", requireAdmin, createSchedule);
router.put("/updateschedule/:id", requireAdmin, updateSchedule);
router.delete("/deleteschedule/:id", requireAdmin, deleteSchedule);

export default router;
