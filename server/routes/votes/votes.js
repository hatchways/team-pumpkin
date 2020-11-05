const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Poll = require('../../models/Polls');
const User = require('../../models/User');
const FriendList = require('../../models/FriendList');

router.post('/votes/:pollId', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { voteFor, pollOwnerId } = req.body;
    const { pollId } = req.params;
    const pollOwnerDetails = await User.findOne({ _id: pollOwnerId });

    console.log('Poll owner and user', pollOwnerId, userId);
    console.log('Poll Owner Details', pollOwnerDetails);

    if (pollOwnerId !== userId && pollOwnerDetails.friends.includes(userId)) {
      const votesArray = voteFor === 'img1' ? 'votesForUrl1' : 'votesForUrl2';
      const pollOwnerSpecificPoll = await Poll.findOne({ userId: pollOwnerId, _id: pollId });

      //Check if the user is part of the invited users for this poll
      const friendList = await FriendList.findOne({ friendListName: pollOwnerSpecificPoll.friend, user: pollOwnerId });
      console.log(friendList);
      if (!friendList.friends.includes(userId)) {
        return res.status(400).json({ msg: 'User is not a part of this friendlist' });
      }

      if (
        !pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
        !pollOwnerSpecificPoll.votesForUrl2.includes(userId)
      ) {
        await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $push: { [votesArray]: userId } });
        const response = await Poll.find({ userId: pollOwnerId });
        res.status(200).json(response);
        return;
      }
      if (
        pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
        !pollOwnerSpecificPoll.votesForUrl2.includes(userId) &&
        voteFor === 'img2'
      ) {
        await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $pull: { votesForUrl1: userId } });
        await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $push: { [votesArray]: userId } });
        const response = await Poll.find({ userId: pollOwnerId });
        res.status(200).json(response);
        return;
      }
      if (
        !pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
        pollOwnerSpecificPoll.votesForUrl2.includes(userId) &&
        voteFor === 'img1'
      ) {
        await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $pull: { votesForUrl2: userId } });
        await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $push: { [votesArray]: userId } });
        const response = await Poll.find({ userId: pollOwnerId });
        res.status(200).json(response);
        return;
      }
      if (
        (pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
          !pollOwnerSpecificPoll.votesForUrl2.includes(userId) &&
          voteFor === 'img1') ||
        (!pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
          pollOwnerSpecificPoll.votesForUrl2.includes(userId) &&
          voteFor === 'img2')
      ) {
        await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $pull: { [votesArray]: userId } });
        const response = await Poll.find({ userId: pollOwnerId });
        res.status(200).json(response);
        return;
      }
    } else {
      res.status(400).json({ err: 'cannot vote' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
