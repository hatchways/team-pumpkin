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
    Params: user, friendListname, friends
*/
router.post(
  "/add",
  authentication,
  [
    check("user", "User is required").not().isEmpty(),
    check("friendListName", "Friend List name is required").not().isEmpty(),
  ],
  async (req, res) => {
    //Errors from express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring
    const { user, friendListName, friends } = req.body;

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
        user,
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

/*
    Type: DELETE route
    Desc: DELETE a friend list
    Acc: private
    Params: none
*/
router.delete("/list/:list_id", authentication, async (req, res) => {
  try {
    const friendList = await FriendList.findById(req.param.list_id);
    if (!friendList)
      return res.status(400).json({ msg: "Friend List not found" });

    await friendList.remove();

    res.json({ msg: "Friend list removed" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

/*
    Type: GET route
    Desc: Get all friend lists
    Acc: private
    Params: none
*/
router.get("/lists", authentication, async (req, res) => {
  try {
    //Find the friend lists and sort by most recent
    const friendLists = await FriendList.find().populate().sort({ date: -1 });

    res.json(friendLists);
  } catch (err) {
    res.status(500).send("Retrieving friend-Lists error");
  }
});

/*
    Type: Patch route
    Desc: Update friends in friend list
    Acc: private
    param: listId, friendListName, friends
*/
// router.patch("/list/:list_id", authentication, async (req, res) => {
//   try {
//   } catch (err) {}
// });

module.exports = router;
