const express = require("express");
const router = express.Router();
//Middleware
const authentication = require("../../middleware/authentication");

const jwt = require("jsonwebtoken");
const jwtSign = require("../../jwt/jwtSign");

//Model
const User = require("../../models/User");

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
      //Can't find email
      if (!user) {
        return res.status(400).json({ error: { msg: "Invalid Credentials" } });
      }

      //Password match
      const isMatch = await bcrypt.compare(password, user.password);
      //Password doesn't match
      if (!isMatch) {
        return res.status(400).json({ error: { msg: "Invalid Credentials" } });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //User object
      const userObject = await User.findById(payload.user.id).select(
        "-password"
      );

      //Sign JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 1.577e7 },
        (err, token) => {
          if (err) throw err;
          res.json({ sucess: true, token, userObject });
        }
      );
      

      //jwtSign(payload, process.env.JWT_SECRET, res, userObject);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error:(");
    }
  }
);

module.exports = router;
