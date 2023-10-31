require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DATA_BASE = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET_KEY = 'JWT_SECRET_KEY' } = process.env;

module.exports = {
  PORT,
  DATA_BASE,
  JWT_SECRET_KEY,
};
