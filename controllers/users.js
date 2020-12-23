const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const { UserNotFoundMsg } = require('../constants/constants');

module.exports.getUserbyId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(UserNotFoundMsg);
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};
