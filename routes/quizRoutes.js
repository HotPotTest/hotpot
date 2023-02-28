const express = require('express');
const quizController = require('./../controllers/quizController');

const router = express.Router();

//router.param('id', quizController.checkID);

//slide 100
router
  .route('/top-5-movie')
  .get(quizController.aliasTopQuiz, quizController.getAllQuiz);
//we still want to get all the tours ..

//slide 102
router.route('/quiz-stats').get(quizController.getQuizStats);

//slide 103
router.route('/monthly-plan/:year').get(quizController.getMonthlyPlan);

router
  .route('/')
  .get(quizController.getAllQuiz)
  .post(quizController.createQuiz); // as someone gonna hit the route with post request

router
  .route('/:id')
  .get(quizController.getQuiz)
  .patch(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);
module.exports = router;
