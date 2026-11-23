import { Router } from "express";
import { body } from "express-validator";
import { createAdmin, getAdmin, login } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

// Only a logged-in admin can create another admin.
router.post(
  "/createadmin",
  requireAdmin,
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a correct password").isLength({ min: 8 }),
  validate,
  createAdmin
);

router.post(
  "/adminlogin",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  validate,
  login
);

router.post("/getadmin", requireAdmin, getAdmin);

export default router;
