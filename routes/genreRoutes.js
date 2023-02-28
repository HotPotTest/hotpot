const express = require('express');
const genreController = require('./../controllers/genreController');

const router = express.Router();

router.route('/').get(genreController.getAllGenre);

//router.route('/:id').get(genreController.getMovie);

module.exports = router;
