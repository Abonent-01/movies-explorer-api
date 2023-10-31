const router = require('express').Router();
const { login } = require('../controllers/sign-in');
const { validateLogin } = require('../middlewares/validate');

router.post('/', validateLogin, login);

module.exports = router;
