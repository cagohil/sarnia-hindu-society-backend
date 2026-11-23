const express = require("express");
const Admin = require("../models/Admin");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/Admin");
const fetchadmin = require("../middleware/fetchadmin");

const JWT_SECRET = "thetempleofhindu";

// ROUTE 1: Create a User using: POST "api/admin/createadmin"
router.post(
  "/createadmin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a correct password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with this email already
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create new admin
      admin = await Admin.create({
        email: req.body.email,
        password: secPass,
      });

      const data = {
        admin: {
          id: admin.id,
        },
      };
      const adminToken = jwt.sign(data, JWT_SECRET);

      res.json({ adminToken });
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);



// ROUTE 2: Login admin using: POST "api/adminlogin"

router.post(
  "/adminlogin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credential" });
      }

      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "please try to login with correct credential" });
      }

      const data = {
        admin: {
          id: admin.id,
        },
      };
      const adminToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success, adminToken });
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);



// ROUTE 3: Get login admin detail using: POST "api/admin/getadmin"

router.post("/getadmin", fetchadmin,
  async (req, res) => {

    try {
      adminId = req.admin.id;
      const admin = await Admin.findById(adminId).select("-password");
      res.send(admin);
    } catch (error) {
      console.log(error.massage);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
