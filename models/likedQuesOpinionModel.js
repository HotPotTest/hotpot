const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedQuesOpinionSchema = new mongoose.Schema(
  {
    likedByUser: {
      type: Map,
      of: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          _id: false,
        },
        _id: false,
        likeOrDislike: Boolean,
      },
      _id: false,
    },
    whoseQuestionId: {
      type: Schema.Types.ObjectId,
      ref: 'QuesOpinion',
      unique: true,
      validate: {
        validator: async function (v) {
          const doc = await this.constructor.findOne({ whoseQuestionId: v });
          if (doc) {
            throw new Error('Question with this id already exists');
          }
          return true;
        },
        message: 'Error: Answer with this id already exists',
      },
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
