const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const PollsMongoModel = require('../../models/Polls');
const User = require('../../models/User');

router.post('/votes', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { pollId, voteFor, pollOwnerId } = req.body;
    const pollOwnerDetails = await User.findOne({ _id: pollOwnerId });
    const votesArray = voteFor === 'img1' ? 'votesForUrl1' : 'votesForUrl2';
    const pollOwnerSpecificPoll = await PollsMongoModel.findOne({ userId: pollOwnerId, _id: pollId });
    if (pollOwnerSpecificPoll[`${votesArray}`].includes(userId)) {
      const response = await PollsMongoModel.updateOne(
        { userId: pollOwnerId, _id: pollId },
        { $pull: { [votesArray]: userId } },
      );
      res.status(200).json(response);
    } else {
      const response = await PollsMongoModel.updateOne(
        { userId: pollOwnerId, _id: pollId },
        { $push: { [votesArray]: userId } },
      );
      res.status(200).json(response);
    }
  } catch (err) {
    console.log('this is errr', err);
  }
});

module.exports = router;
