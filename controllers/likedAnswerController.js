const LikedAnswer = require('./../models/genreModel');

exports.getAllLikedAnswer = async (req, res) => {
  try {
    const likedAnswer = await LikedAnswer.find();

    res.status(200).json({
      status: 'success',

      results: movies.length,
      data: {
        likedAnswer,
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

//slide 91
