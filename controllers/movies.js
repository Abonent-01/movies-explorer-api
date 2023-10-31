const Movie = require('../models/movie');

const ERROR_CODE_WRONG_DATA = require('../error/wrongDataError');
const ERROR_CODE_NOT_FOUND = require('../error/notFoundError');
const ERROR_CODE_FORBIDDEN = require('../error/forbiddenError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;

    const movies = await Movie.find({ owner });
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

module.exports.addMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const owner = req.user._id;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });

    res.send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ERROR_CODE_WRONG_DATA('Wrong Data.'));
    }
    return next(error);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const movie = await Movie.findById(_id);
    if (!movie) {
      return next(new ERROR_CODE_NOT_FOUND(`Фильм: ${_id} не найден.`));
    }
    const owner = String(movie.owner);

    if (owner !== req.user._id) {
      return next(new ERROR_CODE_FORBIDDEN('Forbidden'));
    }

    await movie.deleteOne();

    res.send({ movie });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ERROR_CODE_WRONG_DATA('Wrong Data.'));
    }
    return next(error);
  }
};
