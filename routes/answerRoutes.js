const express = require('express');
const answerController = require('./../controllers/answerController');

const router = express.Router();

router.route('/').get(answerController.getAllAnswer);

//router.route('/:id').get(genreController.getMovie);

module.exports = router;
