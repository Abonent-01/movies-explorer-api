const Movie = require('../models/movie')

const ERROR_CODE_WRONG_DATA = require('../error/wrongDataError');
const ERROR_CODE_NOT_FOUND = require('../error/notFoundError');
const ERROR_CODE_FORBIDDEN = require('../error/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Card.find({owner})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
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
    nameEN,
    nameRU,
  } = req.body;
  Movie.create({
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
    nameEN,
    nameRU,
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name = "ValidationError") {
        next(new ERROR_CODE_WRONG_DATA(`ValidationError`));
      } else {
        next(err);
      }
    });
}

module.exports.deleteMovie = (req, res, next) => {
  const ereaseMovie = () => {
    Movie.findByIdAndRemove(req.params._id)
      .then((movie) => res.send(movie))
      .catch(next);
  };

  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) next(new ERROR_CODE_NOT_FOUND(`Error...`));
      if (req.user._id === movie.owner.toString()) {
        return ereaseMovie();
      }
      return next(new ERROR_CODE_FORBIDDEN('Error...'));
    })
    .catch(next);
};