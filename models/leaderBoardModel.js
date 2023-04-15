const mongoose = require('mongoose');

const leaderBoardSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  coins: {
    type: Number,
    required: true,
    default: 0,
  },

  correctAns: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Correct answer must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },

  timeStamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

// Middleware to delete related LeaderBoard documents when a User is deleted

const Leaderboard = mongoose.model('Leaderboard', leaderBoardSchema);
module.exports = Leaderboard;
