const express = require('express');
const leaderBoardController = require('./../controllers/leaderBoardController');

const router = express.Router();

//router.param('id', quizController.checkID);

router
  .route('/')
  .post(leaderBoardController.createLeaderboard)
  .get(leaderBoardController.getAllLeaderBoard);
router.route('/:id').get(leaderBoardController.getLeaderBoard)
module.exports = router;
