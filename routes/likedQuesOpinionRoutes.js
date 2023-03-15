const express = require('express');
const likedQuesOpinionController = require('./../controllers/likedQuesOpinionController');

const router = express.Router();

router.route('/').get(likedQuesOpinionController.getAllLikedQuesOpinion);

//router.route('/:id').get(likedQuesOpinionController.getMovie);
router
  .route('/likeQuesOpinions')
  .post(likedQuesOpinionController.likeorDislikeQuesOpinion);

router
  .route('/likeOrDislikeQuesOpinionInfo/:id')
  .get(likedQuesOpinionController.userHaslikedOrDislikedQues);

router
  .route('/:id')
  .patch(likedQuesOpinionController.updatelikeorDislikeQuesOpinion);
module.exports = router;
