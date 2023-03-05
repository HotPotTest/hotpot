const express = require('express');
const movieController = require('./../controllers/movieController');

const router = express.Router();

router.route('/').get(movieController.getAllMovies);
router.route('/loadPopular').get(movieController.loadPopularMovie);
router.route('/getPopular').get(movieController.getAllPopsMovies);
//router.route('/id/:id/movieId/:movieId').get(movieController.getMovieDetail);
router.route('/:id').get(movieController.getMovieDetail);

router.route('/searchMovie').get(movieController.getMovieSearch);
module.exports = router;
