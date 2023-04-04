const mongoose = require('mongoose');
const leaderBoardSchema = new mongoose.Schema({
   
  movie_id: {
  type: Number,
  required: true,
  },
  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  coins: {
  type: Number,
  required: true,
  },
  
  correctAns: {
    type: Number,
    required: true,
    },

  time_stamp: {
  type: Number,
  required: true,
  },
  });
  

const Leaderboard = mongoose.model('Leaderboard', leaderBoardSchema);
module.exports = Leaderboard;