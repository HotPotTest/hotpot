const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Leaderboard = require('./../models/leaderBoardModel');
const mongoose = require('mongoose');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',

      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.followMovie = async (req, res) => {
  try {
    //const user = await User.find();
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    let movieIdsToAdd = req.body;
    console.log('moviessss', movieIdsToAdd);
    if (!user.movieFollowed) {
      user.movieFollowed = new Map();
    }
    movieIdsToAdd.forEach((movie) => {
      user.movieFollowed.set(movie.movieId.toString(), movie);
    });
    /* for (const movie of movies) {
      console.log('movieeeeeeeeeeeeeeeeeeeeeeeeeeee', movie);
      user.movieFollowed.set(movie.movieId, {
        movieId: movie.movieId,
      });
    } */
    /* hero.likedByUser.set("64048a6a03ce7733f8a6a4b5", {
      user: "64048a6a03ce7733f8a6a4b5",
      likeOrDislike: true,
    }); */
    //await user.save();

    //user.removeListener('save', User.correctPassword);
    //user.removeListener('save', User.changedPasswordAfter);
    //user.removeListener('save', User.createPasswordResetToken);

    /* await user.save((err) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json({
          status: 'success',
          message: 'data saved successfully ',
          
        });
      }
    }); */
    await User.updateOne(
      { _id: req.params.id },
      { movieFollowed: user.movieFollowed },
      (err) => {
        if (err) {
          console.error(err);
          res.status(400).json({
            status: 'fail',
            message: 'Failed to update user',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
          });
        }
      }
    );
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};
exports.unfollowMovie = async (req, res) => {
  try {
    let userId = req.params.id;
    let movieIdDel = req.body.movieId;
    console.log('movieID', movieIdDel);
    const user = await User.findById(userId);
    user.movieFollowed.delete(movieIdDel.toString());
    console.log('userrrr movie followed ', user.movieFollowed);
    await User.updateOne(
      { _id: req.params.id },
      { movieFollowed: user.movieFollowed },
      (err) => {
        if (err) {
          console.error(err);
          res.status(400).json({
            status: 'fail',
            message: 'Failed to update user',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
          });
        }
      }
    );
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.followGenre = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    let genreIdsToAdd = req.body;
    console.log('genres ids ', genreIdsToAdd);
    if (!user.favGenre) {
      user.favGenre = new Map();
    }
    genreIdsToAdd.forEach((genre) => {
      user.favGenre.set(genre.genreId.toString(), genre);
    });

    await User.updateOne(
      { _id: req.params.id },
      { favGenre: user.favGenre },
      (err) => {
        if (err) {
          console.error(err);
          res.status(400).json({
            status: 'fail',
            message: 'Failed to update user',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
          });
        }
      }
    );
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.unfollowGenre = async (req, res) => {
  try {
    let userId = req.params.id;
    let genreIdDel = req.body.genreId;
    console.log('genre', genreIdDel);
    const user = await User.findById(userId);
    user.favGenre.delete(genreIdDel.toString());
    console.log('userrrr movie followed ', user.favGenre);
    await User.updateOne(
      { _id: req.params.id },
      { favGenre: user.favGenre },
      (err) => {
        if (err) {
          console.error(err);
          res.status(400).json({
            status: 'fail',
            message: 'Failed to update user',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
          });
        }
      }
    );
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Leaderboard.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$userId',
          numCoins: { $sum: '$coins' },
        },
      },
    ]);
    const users = await User.findById(userId)
      .populate({ path: 'movieFollowed.$*.movieId', select: 'movieName -_id' })
      .populate({ path: 'favGenre.$*.genreId', select: 'genre_name -_id' });

    /*for (let [key, value] of users.favGenre) {
      console.log(' genre name ' + value.genreId.genre_name);
      console.log(' genre id ' + key);
    }
    for (let [key, value] of users.movieFollowed) {
      console.log(' movie name ' + value.movieId.movieName);
      console.log(' movie id ' + key);
    } */

    res.status(200).json({
      status: 'success',

      coinData: {
        result,
      },
      userdata: {
        users,
      },
    });
  } catch (err) {
    console.log('errror', err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//slide 91

//

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
