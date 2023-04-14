const LeaderBoard = require('./../models/leaderBoardModel'); //import leaderBoard model

exports.getLeaderBoard = async (req, res) => {
  const id = req.params.id;

  try {
    // const leaderBoard = await LeaderBoard.findById(req.params.id);
    // const leaderBoard = await LeaderBoard.findByName(req.params.movieId);
    //const leaderBoard = await LeaderBoard.find();
    const leaderBoard = await LeaderBoard.find({ movieId: id })
      .select({ userName: 1, coins: 1, correctAns: 1, time_stamp: 1 })
      .sort({ coins: -1 })
      .sort({ time_stamp: 1 })
      .limit(5);

    //console.log(leaderBoard.time_stamp.toISOString())

    res.status(200).json({
      status: 'success',
      data: {
        leaderBoard,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllLeaderBoard = async (req, res) => {
  try {
    const leaderBoards = await LeaderBoard.find();

    res.status(200).json({
      status: 'success',

      results: leaderBoards.length,
      data: {
        leaderBoards,
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

exports.createLeaderboard = async (req, res) => {
  try {
    const newLeaderboard = await LeaderBoard.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        quiz: newLeaderboard,
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
