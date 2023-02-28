const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema(
  {
    genre_id: {
      type: Number,
      required: true,
      unique: true,
    },
    genre_name: {
      type: String,

      required: [true, 'A genre name is required'],
      unique: true,
    },
  },
  {
    toJSON: { virtuals: false },
    toObject: { virtuals: true },
  }
);
const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
