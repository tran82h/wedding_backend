const Joi = require('joi');
const mongoose = require('mongoose');

const Guest = mongoose.model('Guest', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateGuest(guest) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(guest, schema);
}

exports.Guest = Guest;
exports.validate = validateGuest;