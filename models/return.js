const mongoose = require('mongoose');
const Joi = require('joi');

const ReturnSchema = new mongoose.Schema({
  tool: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rentStartDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  rentCompany: {
    type: String,
    required: true,
  },
});

const Return = mongoose.model('Return', ReturnSchema);

module.exports.Return = Return;
