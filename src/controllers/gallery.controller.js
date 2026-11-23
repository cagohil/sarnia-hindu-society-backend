import { Image } from "../models/gallery.model.js";
import { HttpError, notFound } from "../utils/httpError.js";

export const listImages = async (req, res) => {
  res.json(await Image.find());
};

export const createImage = async (req, res) => {
  if (!req.file) throw new HttpError(400, "Please choose a JPG, PNG or WebP image");
  const images = await Image.create({ title: req.body.title, image: req.file.filename });
  res.send(images);
};

export const updateImage = async (req, res) => {
  const update = {};
  if (req.file) update.image = req.file.filename;
  if (req.body.title) update.title = req.body.title;

  const images = await Image.findByIdAndUpdate(req.params.id, { $set: update }, { returnDocument: "after" });
  if (!images) throw notFound();
  res.json({ images });
};

export const deleteImage = async (req, res) => {
  const images = await Image.findByIdAndDelete(req.params.id);
  if (!images) throw notFound();
  res.json({ Success: "image has been deleted", images });
};
