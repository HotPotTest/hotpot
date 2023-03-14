const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUser);

router.route('/unfollowMovie/:id').patch(userController.unfollowMovie);
router
  .route('/:id')
  .get(userController.getUserData)
  .patch(userController.followMovie);

module.exports = router;
