const express = require('express');
const movieController = require('./../controllers/movieController');

const router = express.Router();

router.route('/').get(movieController.getAllMovies);
router.route('/loadPopular').get(movieController.loadPopularMovie);
router.route('/loadTopRated').get(movieController.loadTopRated);
router.route('/getPopular').get(movieController.getAllPopsMovies);
router.route('/getTopRated').get(movieController.getAllTopRated);
router.route('/addMovie').post(movieController.addMovie);
router.route('/updateCast/:id').patch(movieController.addCast);

router.route('/quizInfo/:id').get(movieController.getUserQuizData);

//router.route('/id/:id/movieId/:movieId').get(movieController.getMovieDetail);
router.route('/searchMovie').get(movieController.getMovieSearch);

router.route('/quesAns/:id').get(movieController.getQuesAns);

router.route('/:id').get(movieController.getMovieDetail);

module.exports = router;
