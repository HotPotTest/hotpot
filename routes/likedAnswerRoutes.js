const express = require('express');
const likedAnswerController = require('./../controllers/likedAnswerController');
const router = express.Router();

router.route('/').get(likedAnswerController.getAllLikedAnswer);

//router.route('/:id').get(likedAnswerController.getMovie);
router.route('/likeAnswer').post(likedAnswerController.likeorDislikeAnswer);

router.route('/:id').get(likedAnswerController.updatelikeorDislikeAnswer);

/*router
  .route('/:id/likeOrDislikeInfo')
  .get(likedAnswerController.userHaslikedOrDislikedAnswer); */

module.exports = router;
