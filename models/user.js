const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const ERROR_CODE_AUTH = require('../error/authError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Неверный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // Status 401:
      if (!user) {
        throw new ERROR_CODE_AUTH('Access Denied');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // Status 401:
          if (!matched) {
            throw new ERROR_CODE_AUTH('Access Denied');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
