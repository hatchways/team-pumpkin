const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Polls = require('../../models/Polls');
const { cloudinary } = require('../../cloudinary/cloudinary');

router.post('/polls', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { question, friend } = req.body;

    const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(req.files.img1.tempFilePath, {
      upload_preset: 'team_pumpkin',
    });

    const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(req.files.img2.tempFilePath, {
      upload_preset: 'team_pumpkin',
    });

    const newUserPollData = {
      userId,
      url1: uploadedResponseToCloudinaryForFirstImage.url,
      url2: uploadedResponseToCloudinaryForSecondImage.url,
      friend,
      question,
      votesForUrl1: [],
      votesForUrl2: [],
    };
    const newUserPollDataSaveToMongo = new Polls(newUserPollData);
    newUserPollDataSaveToMongo.save().then(async (resp) => {
      const response = await Polls.find({ userId });
      res.status(200).json(response);
    });
  } catch (err) {
    const error = {
      msg: err,
    };
    console.log(err);
    res.status(400).json(error);
  }
});

router.put('/polls/:_id', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { question, friend } = req.body;
    const { _id } = req.params;

    const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(req.files.img1.tempFilePath, {
      upload_preset: 'team_pumpkin',
    });
    const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(req.files.img2.tempFilePath, {
      upload_preset: 'team_pumpkin',
    });

    const response = await Polls.updateOne(
      { userId, _id },
      {
        $set: {
          question,
          friend,
          url1: uploadedResponseToCloudinaryForFirstImage.url,
          url2: uploadedResponseToCloudinaryForSecondImage.url,
        },
      },
    );
    res.status(200).json(response);
  } catch (err) {
    const error = {
      msg: err,
    };
    res.status(400).json(error);
  }
});

router.delete('/polls/:_id', authentication, async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await Polls.deleteOne({ _id });
    res.status(200).json(response);
  } catch (err) {
    const error = {
      msg: err,
    };
    console.log(err);
    res.status(400).json(error);
  }
});

router.get('/polls/view', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('this is be userid', userId);
    const response = await Polls.find({ userId });
    res.status(200).json(response);
  } catch (err) {
    const error = {
      msg: err,
    };
    console.log(err);
    res.status(400).json(error);
  }
});

router.get('/polls/view/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const response = await Polls.find({ userId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
