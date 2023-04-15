const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Leaderboard = require('./leaderBoardModel');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first  name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
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
    },
    _id: false,
    // validate: [movieFollowedValidation, 'Duplicate movieId in movieFollowed.'],
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
    },
    _id: false,
    validate: [genreFollowedValidation, 'Duplicate movieId in movieFollowed.'],
  },
  /*role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }, */
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

function movieFollowedValidation(value) {
  console.log('movieeee foloow validation');
  const movieIds = new Set();
  for (const [key, { movieId }] of value.entries()) {
    if (movieIds.has(movieId.toString())) {
      return false;
    }
    movieIds.add(movieId.toString());
  }
  return true;
}

function genreFollowedValidation(value) {
  const genreIds = new Set();
  for (const [key, { genreId }] of value.entries()) {
    if (genreIds.has(genreId.toString())) {
      return false;
    }
    genreIds.add(genreId.toString());
  }
  return true;
}
//slide 127
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//slide 136
userSchema.pre('save', function (next) {
  //if doc is new
  if (!this.isModified('password') || this.isNew) return next();

  //will put 1 second in the past sometimes the token is issued
  //token is issue bot before the create time sptam has been actually been issue
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//methods avaiblablel on all document
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //this.password is not available this refers to current doc as passowrd select i false
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('remove', async function (next) {
  try {
    console.log('❄️❄️❄️❄️❄️❄️❄️');
    await Leaderboard.deleteMany({ userId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

//slide 135
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //logging it as object it will tell variable name along with its value
  console.log({ resetToken }, this.passwordResetToken);
  // we want it to work for 10 mins
  //we just updtae doc not save it we need to modify the data
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//create model out of schema
const User = mongoose.model('User', userSchema);

module.exports = User;
