const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedAnswerSchema = new mongoose.Schema(
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
        like: Boolean,
        dislike: Boolean,
      },
      _id: false,
    },
    whoseAnswerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
      unique: true,
      validate: {
        validator: async function (v) {
          const doc = await this.constructor.findOne({ whoseAnswerId: v });
          if (doc) {
            throw new Error('Answer with this id already exists');
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
/*likedAnswerSchema.methods.updateLikeOrDislike = function (
  userId,
  likeOrDislike
) {
  // Get the map instance
  const likedByUser = this.likedByUser;
  // Update the likeOrDislike field for the specified user
  likedByUser.set(userId, { user: userId, likeOrDislike: likeOrDislike });
  // Save the document
  return this.save();
}; */

async function updateLikeOrDislike(whoseAnswerId, userId, likeOrDislike) {
  // implementation here
}
const LikedAnswer = mongoose.model('LikedAnswer', likedAnswerSchema);
module.exports = LikedAnswer;
//module.exports = { updateLikeOrDislike };
