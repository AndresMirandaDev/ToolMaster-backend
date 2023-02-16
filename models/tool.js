const mongoose = require('mongoose');
const Joi = require('joi');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  serieNumber: {
    type: Number,
    required: true,
  },
  toolGroup: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
      },
      description: {
        type: String,
        minlength: 5,
        maxlength: 150,
        required: true,
      },
    }),
    default: undefined,
  },
  place: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 50,
        maxlength: 100,
        required: true,
      },
      address: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
      },
      projectNumber: {
        type: Number,
        required: true,
      },
    }),
    default: 'Storage',
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Tool = mongoose.model('Tool', toolSchema);

//input validator function

function validateTool(tool) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    serieNumber: Joi.number().required(),
    toolGroup: Joi.objectId(),
    place: Joi.objectId(),
    available: Joi.boolean(),
  };
  return Joi.validate(tool, schema);
}

module.exports.validate = validateTool;
module.exports.Tool = Tool;
