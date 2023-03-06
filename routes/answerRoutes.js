const express = require('express');
const answerController = require('./../controllers/answerController');
const moviesRouter = require('./movieRoutes');
const router = express.Router();

//router.route('/').get(answerController.getAllAnswer);

router.route('/:id').get(answerController.getAllAnswer);
router.route('/postAnswer').post(answerController.createAnswer);

router.use(moviesRouter);
moviesRouter.route('/:id/getAnswer').get(answerController.getAllAnswer);
module.exports = router;
