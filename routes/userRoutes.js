const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUser);

router.route('/:id').get(userController.getUserData);

module.exports = router;
