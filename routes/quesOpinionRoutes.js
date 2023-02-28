const express = require('express');
const quesOpinionController = require('./../controllers/quesOpinionController');

const router = express.Router();

const moviesRouter = require('./movieRoutes');

router.route('/').get(quesOpinionController.getAllQuesOpinion);

//router.route('/:id').get(genreController.getMovie);
router.use(moviesRouter);

/*router
  .route('/api/v1/movies/:id/post')
  .post(quesOpinionController.createQuesOpinion); */

moviesRouter
  .route('/:id/postQues')
  .post(quesOpinionController.createQuesOpinion);
module.exports = router;
