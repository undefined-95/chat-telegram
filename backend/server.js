const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { chats } = require('./data/data');
const { notFound, errorHandler } = require('./middlewares/errorMiddlleware');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())

app.use(require('./routes/index'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Подключено');
    app.listen(PORT);
  })
  .catch((e) => {
    console.log('ошибка при подключении ' + e);
  });
