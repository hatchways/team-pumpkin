const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const PollsMongoModel = require('../../models/Polls');
const User = require('../../models/User');

router.post('/votes', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { pollId, voteFor, pollOwnerId } = req.body;
    console.log('this is re body', req.body);
    const pollOwnerDetails = await User.findOne({ _id: pollOwnerId });
    console.log('PollOwner', pollOwnerDetails);
    const response = await PollsMongoModel.findOne({ userId: pollOwnerId, _id: pollId });
    res.status(200).json(response);
  } catch (err) {}
});

module.exports = router;
