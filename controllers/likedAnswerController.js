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
    const result = await LikedAnswer.find({ whoseAnswerId: id });
    console.log(typeof req.query.user, 'reqqqqq .querry ');
    console.log(
      result[0].likedByUser.get('64048a6a03ce7733f8a6a4b5').likeOrDislike,
      'result'
    );
    //console.log(result);

    LikedAnswer.findById('640c4872ddab1678fc534820').then((hero) => {
      console.log('herro', hero);
      console.log(
        '🎶',
        hero.likedByUser.get('640484d5cb891647dcff7040').likeOrDislike,
        'herrrrrrro'
      );
      console.log(hero.likedByUser.get('640484d5cb891647dcff7040')[0]);
      hero.likedByUser.set(
        hero.likedByUser.get('640484d5cb891647dcff7040').likeOrDislike,
        false
      );
      hero.save();
      console.log();
      //hero.rank = "A";
      //hero.save();
    });
    /*const userP = result[0].likedByUser.get(req.query.user).likeOrDislike;
    console.log(userP, 'USERR');
    result.set(userP, true);
    const updatedList = await result.save();
    console.log(updatedList, 'updated listtttt'); */
    /*const updatedResult = await LikedAnswer.findByIdAndUpdate(
      id,
      {
        $set: {
          'likedByUser.64048a6a03ce7733f8a6a4b5.likeOrDislike': true,
        },
      },
      { new: true }
    ); */

    console.log(updatedResult);

    /*result.set('64048a6a03ce7733f8a6a4b5', {
      user: '64048a6a03ce7733f8a6a4b5',
      likeOrDislike: true,
    }); */
    res.status(200).json({
      status: 'success',
      data: {
        updatedResult,
      },
    });
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
