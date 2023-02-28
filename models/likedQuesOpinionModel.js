const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedQuesOpinionSchema = new mongoose.Schema(
  {
    likedByUser: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    quesOpinionIdLiked: {
      type: Schema.Types.ObjectId,
      ref: 'QuesOpinion',
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
const LikedQuesOpinion = mongoose.model(
  'LikedQuesOpinion',
  likedQuesOpinionSchema
);
module.exports = LikedQuesOpinion;
