const bcrypt = require('bcrypt');
const User = require('../models/user');
const ERROR_CODE_DUPLICATE = require('../error/duplicateError');
const { ERROR_CODE_WRONG_DATA } = require('../error/error');
const { generateToken } = require('../middlewares/auth');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_DUPLICATE('Такой e-mail уже зарегистрирован');
      }
      const token = generateToken({ _id: user._id });

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });

      res.status(201).json({name: user.name, email: user.email, token});
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ERROR_CODE_DUPLICATE('Такой e-mail уже зарегистрирован'));
      }
      if (error.name === 'ValidationError') {
        return next(new ERROR_CODE_WRONG_DATA());
      }
      return next(error);
    });
};
