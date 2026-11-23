import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { env } from "../config/env.js";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const imageUpload = (folder) => {
  const destination = path.join(env.uploadDir, folder);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(destination, { recursive: true });
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/[^\w.-]+/g, "_");
      cb(null, `${file.fieldname}-${Date.now()}${safeName}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => cb(null, ALLOWED_TYPES.has(file.mimetype)),
  });
};
