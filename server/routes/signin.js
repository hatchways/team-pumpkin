const express = require("express");
const router = express.Router();
require("dotenv").config();
//Middleware
const authentication = require("../middleware/authentication");

const jwt = require("jsonwebtoken");

//Model
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

/*
    Type: POST route
    Desc: For User Login. Check authentication/ get JWT
    Acc: public
*/
router.post(
  "/signin",
  [
    check("email", "Please enter email").isEmail(),
    check("password", "Please enter password").exists(),
  ],
  async (req, res) => {
    //If errors occur
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    //Destructing the email and password
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errros: [{ msg: "Invalid Credentials" }] });
      }

      //Password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Sign JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 1.577e7 },
        (err, token) => {
          if (err) throw err;
          res.json({ sucess: true, token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error:(");
    }
  }
);

module.exports = router;
