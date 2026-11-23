import { Router } from "express";
import { createMember, deleteMember, listMembers, updateMember } from "../controllers/member.controller.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/fetchallmembers", listMembers);
router.post("/addmember", requireAdmin, createMember);
router.put("/updatemember/:id", requireAdmin, updateMember);
router.delete("/deletemember/:id", requireAdmin, deleteMember);

export default router;
