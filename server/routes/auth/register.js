const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSign = require("../../jwt/jwtSign");

const authentication = require("../../middleware/authentication");

//User Model
const User = require("../../models/User");

/*
    Type: POST route
    Desc: For Register User. Get JWT
    Acc: public
*/
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destruct name, email, and pw from request
    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: { msg: "User already exists with that email" } });
      }

      user = new User({
        name,
        email,
        password,
      });

      //Encrypt pw
      //Gen salt
      const salt = await bcrypt.genSalt(10);
      //hashing
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      //User object
      const userObject = new User({
        name,
        email,
      });

      // jwt.sign(
      //   payload,
      //   process.env.JWT_SECRET,
      //   { expiresIn: 1.577e7 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ sucess: true, token, userObject });
      //   }
      // );

      jwtSign(payload, process.env.JWT_SECRET, res, userObject);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
