const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//slide 222
const compression = require('compression');

const quizRouter = require('./routes/quizRoutes.js');
const leaderboardRouter = require('./routes/leaderboardRoutes.js');
const moviesRouter = require('./routes/movieRoutes.js');
const genreRouter = require('./routes/genreRoutes.js');
const answerRouter = require('./routes/answerRoutes.js');
const quesOpinionRouter = require('./routes/quesOpinionRoutes.js');
const userRouter = require('./routes/userRoutes.js');

//const dislikedAnswerRouter = require('./routes/dislikedAnswerRoutes.js');
//const dislikedQuesOpinionRouter = require('./routes/dislikedQuesOpinionRoutes.js');
const likedAnswerRouter = require('./routes/likedAnswerRoutes.js');
const likedQuesOpinionRouter = require('./routes/likedQuesOpinionRoutes.js');
//express
const app = express();
if (process.env.NODE_ENV === 'development') {
  console.log('developoment environment ');
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // console.log('hello from the middle ware 🏀 ');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});
app.use('/api/v1/quiz', quizRouter);
app.use('/api/v1/leaderBoard', leaderboardRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/genre', genreRouter);
app.use('/api/v1/answer', answerRouter);
app.use('/api/v1/quesOpinion', quesOpinionRouter);
app.use('/api/v1/user', userRouter);

//app.use('/api/v1/dislikedAnswer', dislikedAnswerRouter);
//app.use('/api/v1/dislikedQuesOpinion', dislikedQuesOpinionRouter);
app.use('/api/v1/likedAnswer', likedAnswerRouter);
app.use('/api/v1/likedQuesOpinion', likedQuesOpinionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  /*res.status(404).json({
    status: 'success',
    message: 'cant find',
  }); */
});

app.use(globalErrorHandler);

module.exports = app;
