const Quiz = require('./../models/quizModel'); //import quiz model
const APIFeatures = require('./../utils/apiFeatures');
//slide 100
exports.aliasTopQuiz = (req, res, next) => {
  /* So, basically to manipulate the query object
so that when it reaches the getAllTours handler,
it's then already different.*/

  req.query.limit = '5';
  // everything is tsring here so I am setting to string ..
  req.query.sort = 'movie_id,ques_id';
  req.query.fields = 'movie_name,question';
  next();
};

exports.getQuiz = async (req, res) => {
  const id = req.params.id * 1;

  try {
    // const quiz = await Quiz.findById(req.params.id);
    // const quiz = await Quiz.findByName(req.params.movie_id);
    const quiz = await Quiz.find({ movie_id: id });

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
exports.getAllQuiz = async (req, res) => {
  try {
    //execute the query

    //slide 101
    const features = new APIFeatures(Quiz.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const quizes = await features.query;
    // query might look something like this query.sort().select().skip().limit()

    //send response
    res.status(200).json({
      status: 'success',

      results: quizes.length,
      data: {
        quizes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//slide 91
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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

//slide 92
exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'The given Id got deleted',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//slide 102
exports.getQuizStats = async (req, res) => {
  try {
    const stats = await Quiz.aggregate([
      {
        $match: { movie_id: { $gte: 1 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numQuiz: { $sum: 1 },

          avgMovieId: { $avg: '$movie_id' },
          minMovieId: { $min: '$movie_id' },
          maxMovieId: { $max: '$movie_id' },
        },
      },
      {
        $sort: { avgMovieId: 1 },
      },
      /* {
        $match: { _id: { $ne: 'easy' } },
      }, */
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//slide 103
exports.getMonthlyPlan = async (req, res) => {
  const year = req.params.year * 1;
  const plan = await Quiz.aggregate([
    {
      $unwind: '$options',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
};
