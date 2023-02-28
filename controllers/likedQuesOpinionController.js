const LikedQuesOpinion = require('./../models/likedQuesOpinionModel');

exports.getAllLikedQuesOpinion = async (req, res) => {
  try {
    const likedQuesOpinion = await LikedQuesOpinion.find();

    res.status(200).json({
      status: 'success',

      results: movies.length,
      data: {
        likedQuesOpinion,
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
