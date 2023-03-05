const Movie = require('./../models/movieModel');
const Genre = require('./../models/genreModel');
const axios = require('axios');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

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
  console.log('getMovie search ', req.query);

  try {
    /*const movieDetail = await Movie.findById(id).populate(
      'genreOfMovie',
      'genre_name -_id'
    );

    /// const quiz = await Quiz.find({ movie_id: id }); */

    res.status(200).json({
      status: 'success',
      message: 'movieDetail',
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

    const movies = await Movie.find()
      .populate('genreOfMovie', 'genre_name -_id')
      .select({
        movieBanner: 1,
        category: 1,
        genreOfMovie: 1,
        movieInfo: 1,
        movieName: 1,
        movieId: 1,
      });

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
//slide 91
