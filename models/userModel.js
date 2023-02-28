const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'A user name is required'],
    },

    movieFollowed: {
      type: Map,

      of: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
      of: Number,
      _id: false,
    },

    favGenre: {
      type: Map,

      of: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
      },
      of: Number,
      _id: false,
    },
    coins: {
      type: Number,
      default: 0,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    askedQuesOpinionId: {
      type: [Schema.Types.ObjectId],
      ref: 'QuesOpinion',
    },
    answeredId: {
      type: [Schema.Types.ObjectId],
      ref: 'Answer',
    },

    movieIdQuizPlayed: {
      type: Map,

      of: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
      of: Number,
      _id: false,
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model('User', userSchema);

/*const user = new User({
  userName: 'deepti',
  movieFollowed: {
    '63f980fd27519651d886cc81': 3,
    '63f980fd27519651d886cc84': 4,
  },
  favGenre: {
    '63f88de92fe6062f4cd76ef0': 1,
  },
  isPremium: false,
}); 

user.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User saved successfully');
  }
}); */
module.exports = User;
