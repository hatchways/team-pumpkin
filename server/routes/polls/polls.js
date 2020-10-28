const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const PollsMongoModel = require('../../models/Polls');
const { cloudinary } = require('../../cloudinary/cloudinary');

router.post('/polls', authentication, async (req, res) => {
  try {
    console.log('this is user');
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
    };
    const newUserPollDataSaveToMongo = new PollsMongoModel(newUserPollData);
    newUserPollDataSaveToMongo.save().then(async (resp) => {
      const response = await PollsMongoModel.find({ userId });
      res.status(200).json(response);
    });
    // .then((response) => {
    //   res.status(200).json(response);
    // });
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

    const response = await PollsMongoModel.updateOne(
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
    console.log('this is err', err);
    res.status(400).json(error);
  }
});

router.delete('/polls/:_id', authentication, async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await PollsMongoModel.deleteOne({ _id });
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
    const response = await PollsMongoModel.find({ userId });
    res.status(200).json(response);
  } catch (err) {
    const error = {
      msg: err,
    };
    console.log(err);
    res.status(400).json(error);
  }
});

module.exports = router;
