require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGODB_URL } = require('./config');

const { errorHandler } = require('./middlewares/error-handler');

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://appcontrol.tk', 'http://www.appcontrol.tk',
    'https://appcontrol.tk', 'https://www.appcontrol.tk',
    'https://leannalight.github.io/appliance-frontend',
    'https://leannalight.github.io'],
  credentials: true,
  methods: 'GET,POST,DELETE',
};

app.use(cors(corsOptions));

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  // eslint-disable-next-line no-console
  .then(() => console.log('MongoDB has started ...'))
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${PORT}`);
});
