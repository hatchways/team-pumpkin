const express = require('express');
const router = express.Router();
const User = require('../../models/User');

const authentication = require('../../middleware/authentication');

//@route            POST /api/friends
//@desc             Accept a user's friend request and make them a friend
//@access           Private
router.post('/friends', [authentication], async function (req, res) {
  //The ID passed in the params will be the ID of the user who you want to add as a friend
  //We have the current user's id stored as part of the authentication middleware
  const friendId = req.body.id;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    //If the ID passed in does not exist in the database
    if (!friend) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    //Make sure that the user has received a request from this friend
    //And the friend has sent a request to this user
    const userIndex = user.receivedFriendRequests.indexOf(friendId);
    const friendIndex = friend.outgoingFriendRequests.indexOf(userId);
    if (userIndex !== -1 && friendIndex !== -1) {
      user.friends.push(friend);
      //remove the friend from list of received requests
      user.receivedFriendRequests.splice(userIndex, 1);

      friend.friends.push(user);
      //remove user from friend's list of sent requests
      friend.outgoingFriendRequests.splice(friendIndex);
    } else if (user.outgoingFriendRequests.includes(friendId)) {
      //If you've already made a request, you must wait till the friend accepts
      //Cannot add them yourself

      return res.status(400).json({ msg: 'Please wait for the user to accept your request.' });
    } else {
      //Cannot add a friend unless a request is made and approved
      return res.status(400).json({ msg: 'Cannot add friend. Make a friend request first' });
    }
    await user.save();
    await friend.save();
    res.json({ msg: 'Added friend' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist.' });
    }
    res.status(500).send('Server error');
  }
});

//@route            DELETE /api/friends/:id
//@desc             Delete the user as a friend
//@access           Private

router.delete('/friends/:id', [authentication], async function (req, res) {
  //The ID passed in the params will be the ID of the user who you want to add as a friend
  //We have the current user's id stored as part of the authentication middleware
  const friendId = req.params.id;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist' });
    }

    //Ensure user and friend are friends
    //If so, delete each other from friends array
    const friendIndex = user.friends.indexOf(friend._id);
    const userIndex = friend.friends.indexOf(user._id);

    if (friendIndex !== -1 && userIndex !== -1) {
      user.friends.splice(friendIndex, 1);
      friend.friends.splice(userIndex, 1);
    } else {
      return res.status(400).json({ msg: 'Not friend of this user.' });
    }

    await user.save();
    await friend.save();
    res.json({ msg: 'Friend removed successfully.' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist.' });
    }
    res.status(500).send('Server error');
  }
});

//@route            POST /api/outgoing-requests
//@desc             Send a friend request to a user
//@access           Private
router.post('/outgoing-requests', [authentication], async function (req, res) {
  //The ID passed in the params will be the ID of the user who you want to add as a friend
  //We have the current user's id stored as part of the authentication middleware
  const friendId = req.body.id;
  const userId = req.user.id;
  try {
    if (friendId === userId) {
      return res.status(400).json({ msg: 'You cannot send a friend request to yourself' });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist' });
    }

    //Cannot make multiple friend requests to the same user
    if (user.outgoingFriendRequests.includes(friendId)) {
      return res.status(400).json({ msg: 'You have already sent a friend request to this user.' });
    } else if (user.friends.includes(friendId)) {
      return res.status(400).json({ msg: 'You are already friends with this user.' });
    } else {
      user.outgoingFriendRequests.push(friend);
      friend.receivedFriendRequests.push(user);

      await user.save();
      await friend.save();

      res.json({ msg: 'Friend request sent' });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist.' });
    }
    res.status(500).send('Server error');
  }
});

//@route            DELETE /api/outgoing-requests/:id
//@desc             Cancel the sent friend request
//@access           Private

router.delete('/outgoing-requests/:id', [authentication], async function (req, res) {
  //The ID passed in the params will be the ID of the user who you want to add as a friend
  //We have the current user's id stored as part of the authentication middleware
  const friendId = req.params.id;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist' });
    }

    //Ensure the user has sent a friend request to another user
    //Delete the request
    const friendIndex = user.outgoingFriendRequests.indexOf(friend.id);
    const userIndex = friend.receivedFriendRequests.indexOf(user.id);

    if (friendIndex !== -1 && userIndex !== -1) {
      user.outgoingFriendRequests.splice(friendIndex, 1);
      friend.receivedFriendRequests.splice(userIndex, 1);
    } else {
      return res.status(400).json({ msg: 'Have not sent a friend request to this user.' });
    }

    await user.save();
    await friend.save();
    res.json({ msg: 'Friend request cancelled successfully.' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    res.status(500).send('Server error');
  }
});

//@route            DELETE /api/received-request/:id
//@desc             Reject friend request made by a user
//@access           Private

router.delete('/received-requests/:id', [authentication], async function (req, res) {
  //The ID passed in the params will be the ID of the user who you want to add as a friend
  //We have the current user's id stored as part of the authentication middleware
  const friendId = req.params.id;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      //If the friend ID passed in does not exist in the database
      return res.status(400).json({ msg: 'User does not exist' });
    }

    //Ensure the user has sent a friend request to another user
    //Delete the request
    const friendIndex = user.receivedFriendRequests.indexOf(friend.id);
    const userIndex = friend.outgoingFriendRequests.indexOf(user.id);

    if (friendIndex !== -1 && userIndex !== -1) {
      user.receivedFriendRequests.splice(friendIndex, 1);
      friend.outgoingFriendRequests.splice(userIndex, 1);
    } else {
      return res.status(400).json({ msg: 'Have not received a friend request from this user.' });
    }

    await user.save();
    await friend.save();
    res.json({ msg: 'Friend request rejected.' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    res.status(500).send('Server error');
  }
});

//@route                GET /api/friends
//@desc                 Get all the friends for a user
//@access               Private
router.get('/friends', [authentication], async function (req, res) {
  try {
    const user = await (await User.findById(req.user.id)).populate('friends', ['name']).execPopulate();
    res.json({ friends: user.friends });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

//@route                GET /api/outgoing-requests
//@desc                 Get all the friend requests sent by a user
//@access               Private
router.get('/outgoing-requests', [authentication], async function (req, res) {
  try {
    const user = await (await User.findById(req.user.id)).populate('outgoingFriendRequests', ['name']).execPopulate();
    res.json({ outgoingRequests: user.outgoingFriendRequests });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

//@route                GET /api/friend-requests-received
//@desc                 Get all the friend requests made to a user
//@access               Private
router.get('/received-requests', [authentication], async function (req, res) {
  try {
    const user = await (await User.findById(req.user.id)).populate('receivedFriendRequests', ['name']).execPopulate();
    res.json({ receivedRequests: user.receivedFriendRequests });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

//@route                GET /suggested-friends
//@desc                 Get 20 random users from database as suggested friends
//@access               Private
router.get('/suggested-friends', [authentication], async function (req, res) {
  try {
    let userCount = await User.estimatedDocumentCount();
    const user = await User.findById(req.user.id);

    //Ensure that suggested friends do not include users who are already friends
    //If the total users in the database, excluding friends and yourself
    //is less than 20, then suggest all the users in the database
    userCount -= user.friends.length + user.outgoingFriendRequests.length + 1;
    if (userCount <= 20) {
      let allUsers = await User.find();
      allUsers = allUsers.filter(
        (oneUser) =>
          !user.friends.includes(oneUser._id) &&
          !user.outgoingFriendRequests.includes(oneUser._id) &&
          oneUser._id !== user._id,
      );
      return res.json({ suggestedFriends: allUsers });
    } else {
      const suggestedFriends = [];
      const numbersAdded = [];
      let rand, randomUser;
      while (suggestedFriends.length < 20) {
        rand = Math.floor(Math.random() * userCount);
        //To prevent duplicates, ensure the random number generated has not already been generated
        //The skip() function jumps a certain number from the first document
        //We also only add a suggested friend to the array if they are not already a friend
        //And we do not add the current user to suggested friends
        if (!numbersAdded.includes(rand)) {
          randomUser = await User.findOne().skip(rand).lean();

          if (
            !user.friends.includes(randomUser._id) &&
            !user.outgoingFriendRequests.includes(randomUser._id) &&
            randomUser._id !== user._id
          ) {
            suggestedFriends.unshift(randomUser);
          }
          numbersAdded.unshift(rand);
        }
      }
      return res.json({ suggestedFriends });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
