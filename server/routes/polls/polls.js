const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const PollsMongoModel = require('../../models/Polls');
const { cloudinary } = require('../../cloudinary/cloudinary');

router.post('/create', authentication, async (req, res) => {
  try {
    console.log('this is user', req.user);
    const userId = req.user.id;
    const { question, friend, imagesData } = req.body;
    const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(imagesData[0], {
      upload_preset: 'team_pumpkin',
    });
    const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(imagesData[1], {
      upload_preset: 'team_pumpkin',
    });
    const poll = {
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
    console.log(err);
    res.status(400).json(error);
  }
});

router.put('/update', authentication, async (req, res) => {
  try {
    const userId = req.user.id;
    const { question, friend, imagesData, pollId } = req.body;

    const uploadedResponseToCloudinaryForFirstImage = await cloudinary.uploader.upload(imagesData[0], {
      upload_preset: 'team_pumpkin',
    });
    const uploadedResponseToCloudinaryForSecondImage = await cloudinary.uploader.upload(imagesData[1], {
      upload_preset: 'team_pumpkin',
    });

    const response = await PollsMongoModel.updateOne(
      { userId, 'polls._id': pollId },
      {
        $set: {
          'polls.$.question': question,
          'polls.$.friend': friend,
          'polls.$.url1': uploadedResponseToCloudinaryForFirstImage.url,
          'polls.$.url2': uploadedResponseToCloudinaryForSecondImage.url,
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
    const userId = req.user.id;
    const { pollId } = req.body;
    const response = await PollsMongoModel.update(
      { userId },
      {
        $pull: {
          polls: { _id: pollId },
        },
      },
    );
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
