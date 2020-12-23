const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timer: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  load: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

applianceSchema.methods.withoutOwner = function withoutOwner() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};
module.exports = mongoose.model('appliance', applianceSchema);
