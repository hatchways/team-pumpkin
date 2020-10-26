const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "user",
=======
      ref: 'user',
>>>>>>> zeeshan-in-create-polls-36
    },
  ],
  receivedFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "user",
=======
      ref: 'user',
>>>>>>> zeeshan-in-create-polls-36
    },
  ],
  outgoingFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "user",
=======
      ref: 'user',
>>>>>>> zeeshan-in-create-polls-36
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
