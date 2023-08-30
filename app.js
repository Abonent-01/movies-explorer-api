require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const { PORT = 3000, DATA_BASE = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env; // Слушаем 3000 порт

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://neserver.nomoredomainsicu.ru', 'http://neserver.nomoredomainsicu.ru'/*, 'https://api.server.students.nomoreparties.co', 'http://api.server.students.nomoreparties.co'*/],
  credentials: true,
}));

app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());



mongoose.connect(DATA_BASE);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(helmet());
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
