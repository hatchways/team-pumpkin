const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Poll = require('../../models/Polls');
const User = require('../../models/User');

router.get('/users/:pollId', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { voteFor, pollOwnerId } = req.body;
    const { pollId } = req.params;
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
