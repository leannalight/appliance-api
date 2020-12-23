const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { createUser, login, removeCookie } = require('../controllers/login');

// валидируем данные при регистрации пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// валидируем данные при входе в систему / signin
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// logout
router.post('/signout', removeCookie);

module.exports = router;
