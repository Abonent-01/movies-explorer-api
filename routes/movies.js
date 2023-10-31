const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validate');

router.get('/', getMovies);

router.post('/', validateAddMovie, addMovie);

router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
