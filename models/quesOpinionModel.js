const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');
const Movie = require('./movieModel');

const quesOpinionSchema = new mongoose.Schema(
  {
    whichMovieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    askedByWhichUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
    spoiler: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    ratio: {
      type: [Number, Number],
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: true },
  }
);
const QuesOpinion = mongoose.model('QuesOpinion', quesOpinionSchema);
module.exports = QuesOpinion;
