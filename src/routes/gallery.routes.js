const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Image = require("../models/Gallery");
const { body, validationResult } = require("express-validator");
const multer = require("multer");


// ROUTE 1: Get all the images using: GET "api/gallery/fetchallimages"
router.get("/fetchallimages", async (req, res) => {
  try {
    const images = await Image.find({ images: req.body.id });
    res.json(images);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload/image/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + file.originalname);
    }
})



const multerFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


// ROUTE 2: Add a new images using: POST "api/gallery/addimage"
router.post(
  "/addimage",
  fetchadmin,
  upload.single('image'),
  [
    body("title", "Enter a title"),
    body("image", "choose image"),
  ],
  async (req, res) => {
    try {
      const { title, image } = req.body;
      //if there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      console.log('req.file', req.file)
      const images = new Image({
        title,
        image: req.file.filename,
      });

      const saveimages = await images.save();

      res.send(saveimages);
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 3: Update an existing image using: PUT "api/gallery/updateimage"
router.put("/updateimage/:id", upload.single('image'), fetchadmin, async (req, res) => {
  try {
    const { title } = req.body;
    const newImage = {image: req.file.filename};
    if (title) {
      newImage.title = title;
    }

    //Find the image to be updated and update it
    let images = await Image.findById(req.params.id);
    if (!images) {
      return res.status(404).send("Not Found");
    }

    images = await Image.findByIdAndUpdate(
      req.params.id,
      { $set: newImage },
      { new: true }
    );

    res.json({ images });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});



// ROUTE 4: Delete an existing image using: DELETE "api/gallery/deleteimage"
router.delete("/deleteimage/:id", fetchadmin, async (req, res) => {
  try {
    //Find the note to be deleted and delete it
    let images = await Image.findById(req.params.id);
    if (!images) {
      return res.status(404).send("Not Found");
    }



    images = await Image.findByIdAndDelete(req.params.id);

    res.json({ Success: "image has been deleted", images: images });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
