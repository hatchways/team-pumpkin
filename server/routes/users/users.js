const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Poll = require('../../models/Polls');
const User = require('../../models/User');

router.post('/users', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { votesForUrl1, votesForUrl2 } = req.body;
    console.log('this is body', req.body);
    const userListForVote1 = await User.find({
      _id: {
        $in: votesForUrl1,
      },
    });
    const userListForVote2 = await User.find({
      _id: {
        $in: votesForUrl2,
      },
    });
    let result = [];
    const dupUserListVote1 = [...userListForVote1];
    const dupUserListVote2 = [...userListForVote2];
    dupUserListVote1.map((elem) =>
      result.push({
        name: elem.name,
        avatar: elem.avatar ? elem.avatar : null,
        votesFor: 'img1',
      }),
    );
    dupUserListVote1.map((elem) => (elem.votesFor = 'img1'));
    dupUserListVote2.map((elem) =>
      result.push({
        name: elem.name,
        avatar: elem.avatar ? elem.avatar : null,
        votesFor: 'img2',
      }),
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
