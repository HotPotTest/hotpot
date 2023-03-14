const LikedAnswer = require('./../models/likedAnswerModel');

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

exports.likeorDislikeAnswer = async (req, res) => {
  try {
    console.log('liked or dislike  answer ');
    const newlikedAnswer = await LikedAnswer.create(req.body);
    // console.log('id', req.params.id);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newlikedAnswer,
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

exports.updatelikeorDislikeAnswer = async (req, res) => {
  const id = req.params.id;

  try {
    const ansId = req.params.id; // get the document id from request params
    const { userId, likeOrDislike } = req.body; // get userId and likeOrDislike from request body
    console.log(ansId, 'iddddddddd');
    //let userId = req.query.user;
    //let likeOrDislike = Boolean(req.query.likeOrDislike);
    console.log('userId 🙂', userId);
    console.log('likeOrDislike 🌺', likeOrDislike);
    // find the document by id and update the likedByUser map
    LikedAnswer.findOneAndUpdate(
      { whoseAnswerId: ansId },
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
      .then((updatedAnswer) => {
        console.log(updatedAnswer, 'upateeeeeeeeeeeeeeeeeee');
        res.status(200).json({
          status: 'success',
          data: {
            updatedAnswer,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update answer' });
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

exports.userHaslikedOrDislikedAnswer = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.query.user);
    const likedAnswer = await LikedAnswer.findOne({
      whoseAnswerId: req.params.id,
    });

    console.log(likedAnswer.likedByUser);
    const map1 = likedAnswer.likedByUser;
    let userHasLikedOrDisLiked = false;
    let likeOrDislike = false;
    let countLikes = 0;
    let countDisLikes = 0;
    map1.forEach((value, key) => {
      // Chile country
      // 30 age
      // bobby hadz name
      // console.log(value.user, key);
      // console.log(typeof value.user, 'typpppppe');
      // console.log(typeof req.query.user);
      if (value.likeOrDislike == true) {
        countLikes++;
      } else if (value.likeOrDislike == false) {
        countDisLikes++;
      }

      const valUser = JSON.stringify(value.user);
      const currUser = JSON.stringify(req.query.user);
      // console.log(typeof valUser, 'typ eof value user');
      //console.log(typeof currUser, 'typ eof cure user');

      if (valUser === currUser) {
        userHasLikedOrDisLiked = true;
        likeOrDislike = value.likeOrDislike;
        console.log('yes user has liked or disliked');
      } else {
      }
    });
    // console.log(countLikes, 'countLikess');
    //console.log(countDisLikes, 'countDislikes');
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
//slide 91
