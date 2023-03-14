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
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie',
          _id: false,
        },
        _id: false,
        rating: Number,
      },
      _id: false,
      validate: [
        movieFollowedValidation,
        'Duplicate movieId in movieFollowed.',
      ],
    },

    favGenre: {
      type: Map,
      of: {
        genreId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Genre',
          _id: false,
        },
        _id: false,
        rating: Number,
      },
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
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model('User', userSchema);
function movieFollowedValidation(value) {
  const movieIds = new Set();
  for (const [key, { movieId }] of value.entries()) {
    if (movieIds.has(movieId.toString())) {
      return false;
    }
    movieIds.add(movieId.toString());
  }
  return true;
}
/*const user = new User({
  userName: 'deepti',

  movieFollowed: {
    '63f980fd27519651d886cc7c': {
      movieId: '63f980fd27519651d886cc7c',
      rating: 4,
    },
    '63f980fd27519651d886cc82': {
      movieId: '63f980fd27519651d886cc82',
      rating: 3,
    },
  },
  favGenre: {
    '63f88de92fe6062f4cd76eee': {
      genreId: '63f88de92fe6062f4cd76eee',
      rating: 4,
    },
    '63f88de92fe6062f4cd76eef': {
      genreId: '63f88de92fe6062f4cd76eef',
      rating: 3,
    },
  },
  isPremium: false,
  email: 'deepti@gmail.com',
  phone: '8979889898',
});

user.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User saved successfully');
  }
}); */
module.exports = User;
