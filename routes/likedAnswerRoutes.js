const express = require('express');
const likedAnswerController = require('./../controllers/likedAnswerController');
const router = express.Router();

router.route('/').get(likedAnswerController.getAllLikedAnswer);

//router.route('/:id').get(likedAnswerController.getMovie);
router.route('/likeAnswer').post(likedAnswerController.likeorDislikeAnswer);
router
  .route('/likeOrDislikeInfo/:id/l')
  .get(likedAnswerController.userHaslikedOrDislikedAnswer);
router.route('/:id').patch(likedAnswerController.updatelikeorDislikeAnswer);

module.exports = router;
