const mongoose = require('mongoose');
const User = require('./userModel');
const QuesOpinion = require('./quesOpinionModel');
const Schema = mongoose.Schema;

const answersSchema = new mongoose.Schema(
  {
    answerId: {
      type: Number,
      required: true,
      unique: true,
    },
    whoseQuesId: {
      type: Schema.Types.ObjectId,
      ref: 'QuesOpinion',
      required: true,
    },
    answeredByUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    like_count: {
      type: Number,
      default: 0,
    },
    dislike_count: {
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
    contentAns: {
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
const Answer = mongoose.model('Answer', answersSchema);

/*const user = new Answer({
  answer_id: 1,
  whose_ques_id: 111,
});

user.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('answer saved successfully');
  }
}); */

module.exports = Answer;
