const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const { ServerCannotProcessMsg } = require('../constants/constants');

const { PrivateKey } = require('../config');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ user: user.omitPrivate() }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, PrivateKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 2, // cookie lives 2 days
        httpOnly: true,
        // sameSite: 'none', // требования браузера при кросс-доменных запросах
        // secure: true, // требования браузера при кросс-доменных запросах
      });
      return res.send({ token });
    })
    .catch(next);
};

module.exports.removeCookie = (req, res, next) => {
  res.cookie('jwt', '', {
    maxAge: -1,
    httpOnly: true,
  });
  res.send({ message: 'You successfully signed out!' })
    .catch(() => next(new BadRequestError(ServerCannotProcessMsg)));
};
