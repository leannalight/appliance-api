const mongoose = require('mongoose');
const { DuplicateEmailMsg } = require('../constants/constants');
// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (error, req, res, next) => {
  let { statusCode = 500, message } = error;

  if
  (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    statusCode = 400;
  }
  if (error.code === 11000) {
    statusCode = 409;
    message = DuplicateEmailMsg;
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : message,
  });
};
