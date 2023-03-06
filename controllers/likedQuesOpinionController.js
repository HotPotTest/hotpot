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

exports.likeQuesOpinion = async (req, res) => {
  try {
    console.log('liked ques opin Router ');
    const newlikedQuesOpinion = await LikedQuesOpinion.create(req.body);
    // console.log('id', req.params.id);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        quiz: newlikedQuesOpinion,
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
