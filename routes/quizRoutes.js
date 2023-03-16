const express = require('express');
const quizController = require('./../controllers/quizController');

const router = express.Router();

router.route('/postQues').post(quizController.createQuiz);

router.route('/:id').get(quizController.getQuiz);

module.exports = router;
