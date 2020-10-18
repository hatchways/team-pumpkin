const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const PollsMongoModel = require('../../models/Polls');
const { cloudinary } = require('../../cloudinary/cloudinary');
const { uuid } = require('uuidv4');

router.post('/create', authentication, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { question, friend, imagesData } = req.body;
    const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(imagesData[0], {
      upload_preset: 'team_pumpkin',
    });
    const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(imagesData[1], {
      upload_preset: 'team_pumpkin',
    });
    const poll = {
      pollId: uuid(),
      url1: uploadedResponseToCloudinaryForFirstImage.url,
      url2: uploadedResponseToCloudinaryForSecondImage.url,
      friend,
      question,
    };
    const polls = [poll];
    const userPollsData = await PollsMongoModel.findOne({
      userId,
    });
    if (!!userPollsData) {
      const response = await PollsMongoModel.updateOne(
        { userId },
        {
          $push: {
            polls: poll,
          },
        },
      );
      res.status(200).json(response);
    } else {
      const newUserPollData = {
        userId,
        polls,
      };
      const newUserPollDataSaveToMongo = new PollsMongoModel(newUserPollData);
      newUserPollDataSaveToMongo.save().then((response) => {
        res.status(200).json(response);
      });
    }
  } catch (err) {
    const error = {
      msg: err,
    };
    res.status(400).json(error);
  }
});

router.put('/update', authentication, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { question, friend, imagesData, pollId } = req.body;
    const userPollsData = await PollsMongoModel.findOne({
      userId,
    });
    if (!!userPollsData) {
      const existingUserPollIndex = userPollsData.polls.findIndex((elem) => elem.pollId === pollId);
      const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(imagesData[0], {
        upload_preset: 'team_pumpkin',
      });
      const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(imagesData[1], {
        upload_preset: 'team_pumpkin',
      });
      userPollsData.polls[existingUserPollIndex] = {
        pollId,
        url1: uploadedResponseToCloudinaryForFirstImage.url,
        url2: uploadedResponseToCloudinaryForSecondImage.url,
        friend,
        question,
      };
      const response = await PollsMongoModel.updateOne(
        { userId },
        {
          $set: {
            userId: userPollsData.userId,
            polls: userPollsData.polls,
          },
        },
      );
      res.status(200).json(response);
    }
  } catch (err) {
    const error = {
      msg: err,
    };
    res.status(400).json(error);
  }
});

router.put('/delete', authentication, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { pollId } = req.body;
    const userPollsData = await PollsMongoModel.findOne({
      userId,
    });
    if (!!userPollsData) {
      const response = await PollsMongoModel.update(
        { userId },
        {
          $pull: {
            polls: { pollId },
          },
        },
      );
      res.status(200).json(response);
    }
  } catch (err) {
    const error = {
      msg: err,
    };
    res.status(400).json(error);
  }
});

module.exports = router;
