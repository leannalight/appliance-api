const Appliance = require('../models/appliance');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { AppNotFoundMsg } = require('../constants/constants');
const { AccessDeniedMsg } = require('../constants/constants');

module.exports.createAppliance = (req, res, next) => {
  const {
    title, timer, temperature, load,
  } = req.body;
  const owner = req.user._id;

  Appliance.create({
    title, timer, temperature, load, owner,
  })
    .then((appliance) => res.status(201).send({ appliance: appliance.withoutOwner() }))
    .catch(next);
};

module.exports.getAppliances = (req, res, next) => {
  const owner = req.user._id;
  Appliance.find({ owner })
    .then((appliances) => res.send({ appliances }))
    .catch(next);
};

module.exports.deleteAppliance = (req, res, next) => {
  const { applianceId } = req.params;
  Appliance.findById(applianceId).populate('owner')
    .orFail(() => {
      throw new NotFoundError(AppNotFoundMsg);
    })
    .then((appliance) => {
      if (appliance.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(AccessDeniedMsg);
      }
      return appliance.remove()
        .then(() => res.send({ appliance: appliance.withoutOwner() }));
    })
    .catch(next);
};
