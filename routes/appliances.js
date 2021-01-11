const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const { getAppliances, createAppliance, deleteAppliance } = require('../controllers/appliances');

router.get('/', auth, getAppliances);

router.post('/', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    programme: Joi.string().required(),
    timer: Joi.string().required(),
    temperature: Joi.string().required(),
  }),
}), auth, createAppliance);

router.delete('/:applianceId', celebrate({
  body: Joi.object().keys({
    applianceId: Joi.string().alphanum().length(24),
  }),
}), auth, deleteAppliance);

module.exports = router;
