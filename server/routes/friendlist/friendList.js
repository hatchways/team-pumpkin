const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authentication = require('../../middleware/authentication');

//Models
const FriendList = require('../../models/FriendList');
const User = require('../../models/User');

/*
    Type: POST route
    Desc: Create a new Friends list
    Acc: private
    Params: user, friendListname, friends
*/
router.post(
  '/lists',
  authentication,
  [check('friendListName', 'Friend List name is required').not().isEmpty()],
  async (req, res) => {
    //Errors from express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring
    const { friendListName, friends } = req.body;
    const user = req.user.id;

    try {
      //Make sure that the friend list name is unique
      let friendList = await FriendList.findOne({ user, friendListName });
      if (friendList) {
        return res.status(400).json({
          error: { msg: 'Already have a friend list of the same name.' },
        });
      }
      const saveUser = await User.findById(user);

      // friends = [...new Set(friends)];
      friends.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      //Create a new FriendList object
      friendList = new FriendList({
        user,
        friendListName,
        friends,
      });

      saveUser.friendLists.unshift(friendList);

      // console.log(friends);
      await saveUser.save();
      await friendList.save();

      // console.log(friendList);

      return res.json(friendList);
    } catch (err) {
      res.status(500).send('Friend List Error');
    }
  },
);

/*
    Type: DELETE route
    Desc: DELETE a friend list
    Acc: private
    Params: none
*/
router.delete('/lists/:list_id', authentication, async (req, res) => {
  try {
    const friendList = await FriendList.findById(req.params.list_id);
    if (!friendList) return res.status(400).json({ msg: 'Friend List not found' });

    await friendList.remove();

    res.json({ msg: 'Friend list removed' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

/*
    Type: GET route
    Desc: Get all friend lists
    Acc: private
    Params: none
*/
router.get('/lists', authentication, async (req, res) => {
  try {
    //Find the friend lists and sort by most recent
    // const friendLists = await FriendList.find().populate().sort({ date: -1 });

    const friendLists = await FriendList.find({
      user: req.user.id,
    })
      .populate()
      .sort({ createdAt: 'descending' });

    res.json(friendLists);
  } catch (err) {
    res.status(500).send('Retrieving friend-Lists error');
  }
});

/*
    Type: GET route
    Desc: Get a friend lists
    Acc: private
    Params: none
*/
router.get('/lists/:list_id', authentication, async (req, res) => {
  try {
    const friendList = await FriendList.findById(req.params.list_id);
    if (!friendList) return res.status(400).json({ msg: 'Friend list not found' });
    res.json(friendList);
  } catch (err) {
    res.status(500).send('friend list error');
  }
});

/*
    Type: Put route
    Desc: Update friends in friend list
    Acc: private
    param: listId, friendListName, friends
*/
router.put(
  '/lists/:list_id',
  authentication,
  [check('friendListName', 'Friend List name is required').not().isEmpty()],
  async (req, res) => {
    try {
      console.log('edit');
      //Errors from express validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Destructuring
      const { friendListName, friends } = req.body;

      //Get the existing friend list
      const friendList = await FriendList.findById(req.params.list_id);

      if (!friendList) return res.status(400).json({ msg: 'Friend list not found' });

      friendList.friendListName = friendListName;
      // friends.filter(function (value, index, self) {
      //   return self.indexOf(value) === index;
      // });
      friendList.friends = friends;

      await friendList.save();

      res.json(friendList);
    } catch (err) {
      res.status(500).send('Edit friend list error');
    }
  },
);

/*
    Type: Patch route
    Desc: Update individual friend in friend list
    Acc: private
    param: listId, friendListName, friends
*/
router.patch('/lists/:list_id', authentication, async (req, res) => {
  try {
    const { friendListName, friends } = req.body;
    const updateFriendList = { friendListName, friends };

    FriendList.findByIdAndUpdate(req.params.list_id, updateFriendList, {
      lean: true,
      omitUndefined: true,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    //Update list
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
