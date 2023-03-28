const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
/*router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/unfollowMovie/:id').patch(userController.unfollowMovie);
router
  .route('/:id')
  .get(userController.getUserData)
  .patch(userController.followMovie); */

module.exports = router;
