const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ERROR_CODE_NOT_FOUND = require('../error/notFoundError');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new ERROR_CODE_NOT_FOUND('Error...'))
});

module.exports = router;