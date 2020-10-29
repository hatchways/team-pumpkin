const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'users',
  },
  url1: String,
  url2: String,
  friend: String,
  question: String,
  votesForUrl1: [mongoose.Types.ObjectId],
  votesForUrl2: [mongoose.Types.ObjectId],
});

module.exports = Polls = mongoose.model('polls', PollSchema);
