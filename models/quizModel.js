const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema(
  {
    movie_id: {
      type: Number,
      required: true,
    },
    movie_name: {
      type: String,

      required: [true, 'A movie name is required'],
    },
    ques_id: {
      type: Number,
      required: true,
      unique: true,
    },

    quiz_type: {
      type: String,
      default: 'multiple',
    },
    difficulty: {
      type: String,
      default: 'easy',
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      select: false,
    },
    options: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//slide 104
quizSchema.virtual('Movie Id add one').get(function () {
  return this.movie_id + 1;
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
//just for testing
/*const testQuiz = new Quiz({
  movie_name: 'Pathaan',
  ques_id: 112,
  movie_id: 1,
  type: 'easy',
});
testQuiz
  .save()
  .then()
  .catch((err) => {
    console.log('error', err);
  });  */
