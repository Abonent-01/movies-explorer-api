const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimiter = require('./middlewares/rateLimiter');
const { PORT, DATA_BASE } = require('./utils/config');
const routes = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
})
  .then(() => console.log('Mongodb is working'))
  .catch((err) => console.error(err));

const app = express();
app.use(cors({
  origin: ['http://localhost:3001', 'https://server.nomoreparties.co', 'http://server.nomoreparties.co'],
  credentials: true,
}));

app.use(helmet());
app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
