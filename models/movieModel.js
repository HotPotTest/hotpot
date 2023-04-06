const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    movieName: {
      type: String,

      required: [true, 'A movie name is required'],
    },
    movieInfo: {
      type: String,
    },
    director: {
      type: [String],
      required: true,
    },
    cast: {
      type: [
        {
          Role: String,
          Name: String,
          Image: String,
        },
      ],
      _id: false,
    },
    movieBanner: {
      type: [String],
      required: true,
    },
    movieBannerSmall: {
      type: String,
      required: true,
    },
    trailer: {
      type: [String],
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    genreOfMovie: {
      type: [Schema.Types.ObjectId],
      ref: 'Genre',
    },
    releaseDate: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: true },
  }
);
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
