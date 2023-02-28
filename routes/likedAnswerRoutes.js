const express = require('express');
const likedAnswerController = require('./../controllers/likedAnswerController');

const router = express.Router();

router.route('/').get(likedAnswerController.getAllLikedAnswer);

//router.route('/:id').get(likedAnswerController.getMovie);

module.exports = router;
