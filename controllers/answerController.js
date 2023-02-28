const Answer = require('./../models/answerModel');

exports.getAllAnswer = async (req, res) => {
  try {
    // const answer = await Answer.find();

    res.status(200).json({
      status: 'success',

      //results: answer.length,
      // data: {
      //  answer,
      // },
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
