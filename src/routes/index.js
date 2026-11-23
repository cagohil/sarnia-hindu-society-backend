import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import eventRoutes from "./event.routes.js";
import galleryRoutes from "./gallery.routes.js";
import memberRoutes from "./member.routes.js";
import scheduleRoutes from "./schedule.routes.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/events", eventRoutes);
router.use("/gallery", galleryRoutes);
router.use("/members", memberRoutes);
router.use("/schedules", scheduleRoutes);

export default router;
