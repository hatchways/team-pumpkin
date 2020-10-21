const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authentication = require("../../middleware/authentication");

//Models
const FriendList = require("../../models/FriendList");
const User = require("../../models/User");

/*
    Type: POST route
    Desc: Create a new Friends list
    Acc: private
    Params: userId, friendListname, friends
*/
router.post(
  "/add",
  authentication,
  [
    check("userId", "User is required").not().isEmpty(),
    check("friendListName", "Friend List name is required").not().isEmpty(),
  ],
  async (req, res) => {
    //Errors from express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring
    const { userId, friendListName, friends } = req.body;

    try {
      //Make sure that the friend list name is unique
      let friendList = await FriendList.findOne({ friendListName });
      if (friendList) {
        return res.status(400).json({
          error: { msg: "Already have a friend list of the same name." },
        });
      }

      //Create a new FriendList object
      friendList = new FriendList({
        userId,
        friendListName,
        friends,
      });

      console.log(friends);

      await friendList.save();

      console.log(friendList);

      return res.json(friendList);
    } catch (err) {
      res.status(500).send("Friend List Error");
    }
  }
);

module.exports = router;
