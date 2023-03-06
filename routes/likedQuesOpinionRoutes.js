const express = require('express');
const likedQuesOpinionController = require('./../controllers/likedQuesOpinionController');

const router = express.Router();

router.route('/').get(likedQuesOpinionController.getAllLikedQuesOpinion);

//router.route('/:id').get(likedQuesOpinionController.getMovie);
router.route('/likeQues').post(likedQuesOpinionController.likeQuesOpinion);
module.exports = router;
