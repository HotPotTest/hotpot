const User = require('./../models/userModel');

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: 'success',

      results: user.length,
      data: {
        user,
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

exports.followMovie = async (req, res) => {
  try {
    //const user = await User.find();
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    let movies = req.body;
    for (const movie of movies) {
      console.log('movieeeee', movie);
      user.movieFollowed.set(movie.movieId, {
        movieId: movie.movieId,
        rating: movie.rating,
      });
    }
    /* hero.likedByUser.set("64048a6a03ce7733f8a6a4b5", {
      user: "64048a6a03ce7733f8a6a4b5",
      likeOrDislike: true,
    }); */
    //await user.save();

    await user.save((err) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json({
          status: 'success',
          message: 'data saved successfully ',
          // results: user.length,
          /*data: {
            user,
          }, */
        });
      }
    });
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
    //const user = await User.find();
    // const user = await User.findById(req.params.id);
    let userId = req.params.id;
    let movieId = req.body;
    console.log('movieID', movieId);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { [`movieFollowed.${movieId}`]: 1 },
      },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });

    /* await user.save((err) => { 
      if (err) {
        console.error(err);
      } else {
        res.status(200).json({
          status: 'success',
          message: 'movie removed successfully ',
        });
      }
    }); */
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
    console.log(req.params);
    const idd = req.params.id;
    console.log('idddddddddddd', idd);
    const uposers = await User.findById(idd)
      .pulate({ path: 'movieFollowed.$*.movieId', select: 'movieName -_id' })
      .populate({ path: 'favGenre.$*.genreId', select: 'genre_name -_id' })
      .lean()
      .select({
        coins: 1,
        isPremium: 1,
        userName: 1,
        movieFollowed: 1,
        favGenre: 1,
      });

    /*console.log(users.movieFollowed);
    const mv = users.movieFollowed;
    const plainObj = Object.assign({}, mv.toObject());
    console.log(plainObj); */
    /* for (const movieId in users.movieFollowed) {
      if (users.movieFollowed.hasOwnProperty(movieId)) {
        users.movieFollowed[movieId].movieId._id = undefined; // remove _id field
        users.movieFollowed[movieId].movieId =
          users.movieFollowed[movieId].movieId.toObject(); // convert to plain object
        delete users.movieFollowed[movieId]._id; // remove object key
      }
    } */

    res.status(200).json({
      status: 'success',

      //results: users.length,
      data: {
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
