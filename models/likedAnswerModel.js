const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedAnswerSchema = new mongoose.Schema(
  {
    likedByUser: {
      type: Set,
      default: [],
      ref: 'User',
    },
    answerIdDisliked: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    },
    likeOrDislike: {
      type: Boolean,
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: true },
  }
);
const LikedAnswer = mongoose.model('LikedAnswer', likedAnswerSchema);
module.exports = LikedAnswer;
