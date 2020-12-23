const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { NeedAuthMsg } = require('../constants/constants');
const { PrivateKey } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(NeedAuthMsg);
  }

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, PrivateKey);
  } catch (error) {
    throw new UnauthorizedError(NeedAuthMsg);
  }

  req.user = payload;

  return next();
};
