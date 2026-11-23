import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const AUTH_ERROR = { error: "Please authenticate using a valid token" };

// Verifies the `adminToken` header and puts the admin on req.admin.
export const requireAdmin = (req, res, next) => {
  const token = req.header("adminToken");
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }
  try {
    const data = jwt.verify(token, env.jwtSecret);
    req.admin = data.admin;
    return next();
  } catch {
    return res.status(401).json(AUTH_ERROR);
  }
};
