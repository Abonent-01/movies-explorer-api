const router = require('express').Router();
const { validateMovieId, validateCreateMovie, validateDeleteMovie } = require('../middlewares/validate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateMovieId, validateDeleteMovie, deleteMovie);

module.exports = router;