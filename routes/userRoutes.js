const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();
router.route('/').get(userController.getAllUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.route('/followMovie/:id').patch(userController.followMovie);
router.route('/followGenre/:id').patch(userController.followGenre);
router.route('/unfollowMovie/:id').patch(userController.unfollowMovie);
router.route('/unfollowGenre/:id').patch(userController.unfollowGenre);
router.route('/userData/:id').get(userController.getUserData);
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
