import { Router } from "express";
import { createImage, deleteImage, listImages, updateImage } from "../controllers/gallery.controller.js";
import { requireAdmin } from "../middleware/auth.js";
import { imageUpload } from "../middleware/upload.js";

const router = Router();
const upload = imageUpload("image");

router.get("/fetchallimages", listImages);
router.post("/addimage", requireAdmin, upload.single("image"), createImage);
router.put("/updateimage/:id", requireAdmin, upload.single("image"), updateImage);
router.delete("/deleteimage/:id", requireAdmin, deleteImage);

export default router;
