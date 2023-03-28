const Genre = require('./../models/genreModel');
const axios = require('axios');
exports.getAllGenre = async (req, res) => {
  try {
    const genre = await Genre.find();

    res.status(200).json({
      status: 'success',

      results: genre.length,
      data: {
        genre,
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

exports.getGenreSearch = async (req, res) => {
  //const id = req.params.id;
  console.log('getGenre search ', req.query.search);

  try {
    const genres = await Genre.find({
      genre_name: { $regex: new RegExp(req.query.search, 'i') },
    }).select('genre_name genre_id');

    res.status(200).json({
      status: 'success',
      data: {
        genres,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.loadGenre = async (req, res) => {
  try {
    const genre = await Genre.find();
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=69d5e703318ee39346e9a644e436b2e1&language=en-USapi_key='
      )
      .then((response) => {
        console.log('responseee', response.data.genres);
        response.data.genres.forEach((item) => {
          const genreDoc = new Genre({
            genre_id: item.id,
            genre_name: item.name,
          });
          genreDoc
            .save()
            .then()
            .catch((err) => {
              console.log('error in saving the genres', err);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(200).json({
      status: 'success',

      results: genre.length,
      data: {
        genre,
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
//slide 91
