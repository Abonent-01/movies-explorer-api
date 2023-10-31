const User = require('../models/user');
const ERROR_CODE_AUTH = require('../error/authError');
const { generateToken } = require('../middlewares/auth');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_AUTH('WrongUser');
      }

      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.json({ token, name: user.name, email: user.email });
    })
    .catch(next);
};
