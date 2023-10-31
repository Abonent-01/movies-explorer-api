const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, NODE_ENV } = require('../utils/config');
const ERROR_CODE_AUTH = require('../error/authError');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret-key', { expiresIn: '7d' });

const checkToken = (token) => {
  if (!token) {
    throw new ERROR_CODE_AUTH('authError');
  }
  try {
    return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret-key');
  } catch (error) {
    throw error;
  }
};

const authentication = (req, res, next) => {
  const token = req.cookies.jwt;

  // Status 401:
  if (!token) {
    return next(new ERROR_CODE_AUTH('authError'));
  }
  let payload;
  try {
    payload = checkToken(token);
  } catch (error) {
    return next(new ERROR_CODE_AUTH('authError'));
  }

  req.user = payload;
  return next();
};

module.exports = { generateToken, authentication, checkToken };
