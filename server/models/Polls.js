const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  polls: [
    {
      pollId: {
        type: String,
        require: true,
        unique: true,
      },
      url: {
        type: String,
        require: true,
        unique: true,
      },
      friend: {
        type: String,
        require: true,
      },
      question: {
        type: String,
        require: true,
        unique: true,
      },
    },
  ],
});

module.exports = Polls = mongoose.model('polls', PollSchema);
