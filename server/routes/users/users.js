const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Poll = require('../../models/Polls');
const User = require('../../models/User');

router.get('/users', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { votesForUrl1, votesForUrl2 } = req.body;
    console.log('this is body', req.body);
    let finalList = [];
    votesForUrl1.map(async (element) => {
      const result = await User.findOne({ _id: element });
      const userData = {
        userName: result.name,
        imgUrl:
          'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
        votesFor: 'img1',
      };
      console.log('this is userData', userData);
      finalList = finalList.concat(userData);
    });
    console.log('this is first first list', finalList);
    votesForUrl2.map(async (element) => {
      const result = await User.findOne({ _id: element });
      const userData = {
        userName: result.name,
        imgUrl:
          'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
        votesFor: 'img1',
      };
      finalList.push(userData);
    });
    console.log('this is first first list', finalList);
    res.status(200).json(finalList);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
