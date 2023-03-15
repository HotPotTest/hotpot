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

exports.likeorDislikeQuesOpinion = async (req, res) => {
  try {
    console.log('liked or dislike  quesion ');
    const newlikedQuesOpinion = await LikedQuesOpinion.create(req.body);
    // console.log('id', req.params.id);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newlikedQuesOpinion,
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

exports.userHaslikedOrDislikedQues = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.query.user);
    const likedQuesOpinion = await LikedQuesOpinion.findOne({
      whoseQuestionId: req.params.id,
    });

    console.log(likedQuesOpinion.likedByUser);
    const map1 = likedQuesOpinion.likedByUser;
    let userHasLikedOrDisLiked = false;
    let likeOrDislike = false;
    let countLikes = 0;
    let countDisLikes = 0;
    map1.forEach((value, key) => {
      if (value.likeOrDislike == true) {
        countLikes++;
      } else if (value.likeOrDislike == false) {
        countDisLikes++;
      }

      const valUser = JSON.stringify(value.user);
      const currUser = JSON.stringify(req.query.user);

      if (valUser === currUser) {
        userHasLikedOrDisLiked = true;
        likeOrDislike = value.likeOrDislike;
        console.log('yes user has liked or disliked');
      } else {
      }
    });

    res.status(201).json({
      status: 'success',
      userHas: userHasLikedOrDisLiked,
      likeOrDislike: likeOrDislike,
      countLikes: countLikes,
      countDisLikes: countDisLikes,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.updatelikeorDislikeQuesOpinion = async (req, res) => {
  const id = req.params.id;

  try {
    const quesId = req.params.id; // get the document id from request params
    const { userId, likeOrDislike } = req.body; // get userId and likeOrDislike from request body
    console.log(quesId, 'iddddddddd');
    //let userId = req.query.user;
    //let likeOrDislike = Boolean(req.query.likeOrDislike);
    console.log('userId 🙂', userId);
    console.log('likeOrDislike 🌺', likeOrDislike);
    // find the document by id and update the likedByUser map
    LikedQuesOpinion.findOneAndUpdate(
      { whoseQuestionId: quesId },
      {
        $set: {
          [`likedByUser.${userId}`]: {
            user: userId,
            likeOrDislike: likeOrDislike,
          },
        },
      },
      { new: true }
    )
      .then((updateQues) => {
        console.log(updateQues, 'upateeeeeeeeeeeeeeeeeee');
        res.status(200).json({
          status: 'success',
          data: {
            updateQues,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update question' });
      });

    /*res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });  */
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
//slide 91
