const Movie = require('./../models/movieModel');
const Genre = require('./../models/genreModel');
const QuesOpinion = require('./../models/quesOpinionModel');
const Answer = require('./../models/answerModel');
const mongoose = require('mongoose');

const axios = require('axios');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      status: 'success',

      results: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.getQuesAns = async (req, res) => {
  try {
    const movieId = req.params.id;
    const result = await QuesOpinion.aggregate([
      {
        $match: {
          whichMovieId: mongoose.Types.ObjectId(movieId),
        },
      },
      {
        $lookup: {
          from: 'likedquesopinions',

          localField: '_id',
          foreignField: 'whoseQuestionId',
          as: 'likedquesopinions',
        },
      },
      {
        $unwind: {
          path: '$likedquesopinions',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'answers',

          localField: '_id',
          foreignField: 'whoseQuesId',
          as: 'answers',
        },
      },
      {
        $unwind: {
          path: '$answers',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'answers.answeredByWhichUser',
          foreignField: '_id',
          as: 'answers.answeredByWhichUser',
        },
      },
      {
        $group: {
          _id: '$_id',
          content: { $first: '$content' },
          ratio: { $first: '$ratio' },
          spoiler: { $first: '$spoiler' },
          createdAt: { $first: '$createdAt' },

          likedquesopinions: { $first: '$likedquesopinions' },
          answers: { $push: '$answers' },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          ratio: 1,
          spoiler: 1,
          createdAt: 1,
          'answers._id': 1,
          'answers.contentAns': 1,
          'answers.spoiler': 1,
          'answers.answeredByWhichUser._id': 1,
          'answers.answeredByWhichUser.userName': 1,
          'likedquesopinions.likedByUser': 1,
        },
      },
    ]);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      status: 'success',

      results: result.length,
      data: {
        result,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.getMovieDetail = async (req, res) => {
  const id = req.params.id;

  const movieId = req.params.movieId * 1;
  console.log('id', id);
  console.log(req.body);
  //console.log('movieId', movieId);
  try {
    const movieDetail = await Movie.findById(id).populate(
      'genreOfMovie',
      'genre_name -_id'
    );

    /// const quiz = await Quiz.find({ movie_id: id });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      status: 'success',
      data: {
        movieDetail,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMovieSearch = async (req, res) => {
  //const id = req.params.id;
  console.log('getMovie search ', req.query.search);

  try {
    /*const movieDetail = await Movie.findById(id).populate(
      'genreOfMovie',
      'genre_name -_id'
    );

    /// const quiz = await Quiz.find({ movie_id: id }); */
    const movies = await Movie.find({
      movieName: { $regex: new RegExp(req.query.search, 'i') },
    }).select('movieName movieId');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      status: 'success',
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllPopsMovies = async (req, res) => {
  try {
    /*const features = new APIFeatures(
      Movie.find().populate('genreOfMovie', genre_Name).select(),
      req.query
    ).limitFields(); */

    const movies = await Movie.find({ category: 'popular' })
      .populate('genreOfMovie', 'genre_name -_id')
      .select({
        movieBanner: 1,
        category: 1,
        genreOfMovie: 1,
        movieInfo: 1,
        movieName: 1,
        movieId: 1,
      });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      status: 'success',

      results: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    console.log('errror', err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllTopRated = async (req, res) => {
  try {
    /*const features = new APIFeatures(
      Movie.find().populate('genreOfMovie', genre_Name).select(),
      req.query
    ).limitFields(); */

    const movies = await Movie.find({ category: 'topRated' })
      .populate('genreOfMovie', 'genre_name -_id')
      .select({
        movieBanner: 1,
        category: 1,
        genreOfMovie: 1,
        movieInfo: 1,
        movieName: 1,
        movieId: 1,
      });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      status: 'success',

      results: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    console.log('errror', err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addMovie = async (req, res) => {
  try {
    console.log('liked or dislike  answer ');
    const newMovie = await Movie.create(req.body);
    // console.log('id', req.params.id);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newMovie,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.loadPopularMovie = async (req, res) => {
  try {
    // const genre = await Movie.find();
    const genreList = await Genre.find();

    const response = {
      status: 'success',
      results: genreList.length,
      data: {
        genreList,
      },
    };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response);
    let genreRes = response;

    /*axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=69d5e703318ee39346e9a644e436b2e1&language=en-US&with_original_language=hi&page=1'
      )
      .then((response) => {
        console.log(genreRes.data.genreList, 'data in axioooos ');
        
        let arr = [];
        response.data.results.forEach((item) => {
          item.genre_ids.forEach(function (id) {
      
            const genre = genreRes.data.genreList.find(
              (p) => p.genre_id === id
            );
            arr.push(genre._id);
          
          });
          console.log(arr, 'arrrr');

          const movieDoc = new Movie({
            movieId: item.id,
            movieName: item.title,
            movieInfo: item.overview,
            movieBanner: item.poster_path,
            category: 'popular',
            releaseDate: item.release_date,
            genreOfMovie: arr,
          });
          arr = [];
          movieDoc
            .save()
            .then()
            .catch((err) => {
              console.log('error in saving the movies', err);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      }); */
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

exports.loadTopRated = async (req, res) => {
  try {
    // const genre = await Movie.find();
    const genreList = await Genre.find();

    const response = {
      status: 'success',
      results: genreList.length,
      data: {
        genreList,
      },
    };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response);
    let genreRes = response;

    /* axios
      .get(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=69d5e703318ee39346e9a644e436b2e1&language=en-US&page=1&with_original_language=hi&page=1'
      )
      .then((response) => {
        console.log(genreRes.data.genreList, 'data in axioooos ');

        let arr = [];
        response.data.results.forEach((item) => {
          item.genre_ids.forEach(function (id) {
            const genre = genreRes.data.genreList.find(
              (p) => p.genre_id === id
            );
            arr.push(genre._id);
          });
          console.log(arr, 'arrrr');

          Movie.findOne({ movieId: item.id }, (err, mov) => {
            if (err) {
              console.log(err);
            } else if (mov) {
              console.log('movie exists!');
            } else {
              const movieDoc = new Movie({
                movieId: item.id,
                movieName: item.title,
                movieInfo: item.overview,
                movieBanner: item.poster_path,
                category: 'topRated',
                releaseDate: item.release_date,
                genreOfMovie: arr,
              });
              arr = [];
              movieDoc
                .save()
                .then()
                .catch((err) => {
                  console.log('error in saving the movies', err);
                });
            }
          });
        });
      }) 
      .catch((error) => {
        console.log(error);
      }); */
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};
//slide 91
