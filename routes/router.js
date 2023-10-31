const router = require('express').Router();
const ERROR_CODE_NOT_FOUND = require('../error/notFoundError');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signupRoute = require('./sign-up');
const loginRoute = require('./sign-in');
const signoutRoute = require('./sign-out');
const { authentication } = require('../middlewares/auth');

router.use('/signup', signupRoute);
router.use('/signin', loginRoute);
router.use(authentication);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('/signout', signoutRoute);

router.use('/*', (req, res, next) => next(new ERROR_CODE_NOT_FOUND('Bad link')));

module.exports = router;
