const mongoose = require('mongoose');

const FriendListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',

    },
    friendListName: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true },
);

module.exports = FriendList = mongoose.model('friendList', FriendListSchema);

