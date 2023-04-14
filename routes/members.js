const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Members = require("../models/Members");
const { body, validationResult } = require("express-validator");
const multer = require("multer");


// ROUTE 1: Get all the Members using: GET "api/members/fetchallmembers"
router.get("/fetchallmembers", async (req, res) => {
  try {
    const members = await Members.find({ members: req.body.id });
    res.json(members);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});


const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/memberimage");
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



// ROUTE 2: Add a new member using: POST "api/members/addmember"
router.post(
  "/addmember",
  fetchadmin,
  upload.single('memberimage'),
  [
    body("memberimage", "choose memberimage"),
    body("name", "Enter a name"),
    body("designation", "Enter a designation"),
    body("about", "Enter a about"),
  ],
  async (req, res) => {
    try {
      const { name, designation, about } = req.body;
      //if there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const members = new Members({
        name,
        designation,
        about,
        memberimage: req.file.filename,
      });

      const savemembers = await members.save();

      res.send(savemembers);
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);



// ROUTE 3: Update an existing member using: PUT "api/menbers/updatemember"
router.put("/updatemember/:id", upload.single('memberimage'), fetchadmin, async (req, res) => {
  try {
    const { memberimage, name, designation, about } = req.body;
    //Create a newMember object
    const newMembers = {memberimage: req.file.filename};
    if (name) {
      newMembers.name = name;
    }
    if (designation) {
      newMembers.designation = designation;
    }
    if (about) {
      newMembers.about = about;
    }

    //Find the note to be updated and update it
    let members = await Members.findById(req.params.id);
    if (!members) {
      return res.status(404).send("Not Found");
    }

    members = await Members.findByIdAndUpdate(
      req.params.id,
      { $set: newMembers },
      { new: true }
    );

    res.json({ members });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing member using: DELETE "api/members/deletemember"
router.delete("/deletemember/:id", fetchadmin, async (req, res) => {
  try {
    //Find the note to be deleted and delete it
    let members = await Members.findById(req.params.id);
    if (!members) {
      return res.status(404).send("Not Found");
    }

// Allow deletion only if admin owen this Note
    // if(members.admin.toString() !== req.admin.id){
    //     return res.status(401).send("Not Allowed");
    // }

    members = await Members.findByIdAndDelete(req.params.id);

    res.json({ Success: "member has been deleted", members: members });
  } catch (error) {
    console.log(error.massage);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
