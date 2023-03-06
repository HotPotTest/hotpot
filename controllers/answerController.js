const Answer = require('./../models/answerModel');

exports.getAllAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const answer = await Answer.find({ whoseQuesId: id })
      .populate('answeredByWhichUser', 'userName -_id')
      .select({
        like_count: 1,
        dislike_count: 1,
        spoiler: 1,
        answeredByWhichUser: 1,
        contentAns: 1,
      });

    res.status(200).json({
      status: 'success',

      results: answer.length,
      data: {
        answer,
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

exports.createAnswer = async (req, res) => {
  try {
    console.log('create Answer ');
    const newAnswer = await Answer.create(req.body);
    // console.log('id', req.params.id);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        quiz: newAnswer,
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
