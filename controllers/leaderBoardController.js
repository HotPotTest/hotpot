const LeaderBoard = require('./../models/leaderBoardModel'); //import leaderBoard model

exports.getLeaderBoard = async (req, res) => {
  const id = req.params.id * 1;

  try {
    // const leaderBoard = await LeaderBoard.findById(req.params.id);
    // const leaderBoard = await LeaderBoard.findByName(req.params.movie_id);
    //const leaderBoard = await LeaderBoard.find();
    const leaderBoard = await LeaderBoard.find({ movie_id: id })
      .sort({ coins: -1 }, { timstamp: 1 })
      .limit(2)
      .toArray();

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
