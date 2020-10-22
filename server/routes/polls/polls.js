const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const PollsMongoModel = require('../../models/Polls');
const { cloudinary } = require('../../cloudinary/cloudinary');

router.post('/create', authentication, async (req, res) => {
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
    newUserPollDataSaveToMongo.save().then((response) => {
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

router.put('/update', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { question, friend, img1, img2, _id } = req.body;

    const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(img1, {
      upload_preset: 'team_pumpkin',
    });
    const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(img2, {
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

router.delete('/delete', authentication, async (req, res) => {
  try {
    const { _id } = req.body;
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

router.get('/view', authentication, async (req, res) => {
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
