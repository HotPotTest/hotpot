const Quiz = require('./../models/quizModel'); //import quiz model

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = await Quiz.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        quiz: newQuiz,
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

exports.getQuiz = async (req, res) => {
  const id = req.params.id;

  try {
    const quiz = await Quiz.find({ movie_id: id })
      .populate('movie_id', 'movieName -_id')
      .select({
        options: 1,

        question: 1,
        answer: 1,
      });

    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
