import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Admin } from "../models/admin.model.js";

const signToken = (admin) => jwt.sign({ admin: { id: admin.id } }, env.jwtSecret);

// POST /api/admin/createadmin  (admin only)
export const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const existing = await Admin.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "sorry a user with this email already exists" });
  }
  const admin = await Admin.create({ email, password: await bcrypt.hash(password, 10) });
  res.json({ adminToken: signToken(admin) });
};

// POST /api/admin/adminlogin
export const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  const ok = admin && (await bcrypt.compare(password, admin.password));
  if (!ok) {
    return res
      .status(400)
      .json({ success: false, error: "please try to login with correct credential" });
  }
  res.json({ success: true, adminToken: signToken(admin) });
};

// POST /api/admin/getadmin  (admin only)
export const getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-password");
  res.send(admin);
};
