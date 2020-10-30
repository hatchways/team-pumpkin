const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Poll = require('../../models/Polls');
const User = require('../../models/User');

router.post('/votes/:pollId', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { voteFor, pollOwnerId } = req.body;
    const { pollId } = req.params;
    const pollOwnerDetails = await User.findOne({ _id: pollOwnerId });
    const votesArray = voteFor === 'img1' ? 'votesForUrl1' : 'votesForUrl2';
    const pollOwnerSpecificPoll = await Poll.findOne({ userId: pollOwnerId, _id: pollId });
    if (!pollOwnerSpecificPoll.votesForUrl1.includes(userId) && !pollOwnerSpecificPoll.votesForUrl2.includes(userId)) {
      const response = await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $push: { [votesArray]: userId } });
      res.status(200).json(response);
      return;
    }
    if (
      pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
      !pollOwnerSpecificPoll.votesForUrl2.includes(userId) &&
      voteFor === 'img2'
    ) {
      await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $pull: { votesForUrl1: userId } });
      const response = await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $push: { [votesArray]: userId } });
      res.status(200).json(response);
      return;
    }
    if (
      !pollOwnerSpecificPoll.votesForUrl1.includes(userId) &&
      pollOwnerSpecificPoll.votesForUrl2.includes(userId) &&
      voteFor === 'img1'
    ) {
      await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $pull: { votesForUrl2: userId } });
      const response = await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $push: { [votesArray]: userId } });
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
      const response = await Poll.updateOne({ userId: pollOwnerId, _id: pollId }, { $pull: { [votesArray]: userId } });
      res.status(200).json(response);
      return;
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
