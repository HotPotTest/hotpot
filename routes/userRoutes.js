const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();
router.route('/').get(userController.getAllUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

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
