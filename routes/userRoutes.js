const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUser);

//router.route('/:id').get(userController.getMovie);

module.exports = router;
