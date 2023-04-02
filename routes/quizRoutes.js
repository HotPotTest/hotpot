const express = require('express');
const quizController = require('./../controllers/quizController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/postQues').post(quizController.createQuiz);

router.route('/:id').get(authController.protect, quizController.getQuiz);

module.exports = router;
