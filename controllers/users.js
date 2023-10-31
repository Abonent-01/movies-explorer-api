const User = require('../models/user');
const ERROR_CODE_DUPLICATE = require('../error/duplicateError');
const ERROR_CODE_NOT_FOUND = require('../error/notFoundError');
const { ERROR_CODE_WRONG_DATA } = require('../error/error');

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ERROR_CODE_NOT_FOUND(`User: ${userId} not found.`));
    }
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ERROR_CODE_WRONG_DATA('WrongData.'));
    }
    return next(error);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updData = {
      name,
      email,
    };

    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(userId, updData, { new: true, runValidators: true });

    if (!user) {
      return next(new ERROR_CODE_NOT_FOUND(`User: ${userId} not found.`));
    }
    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ERROR_CODE_WRONG_DATA('WrongData.'));
    }
    if (error.code === 11000) {
      return next(new ERROR_CODE_DUPLICATE('User alredy exists'));
    }
    return next(error);
  }
};
