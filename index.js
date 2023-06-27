require('dotenv').config();
const express = require('express');
const winston = require('winston');
const Joi = require('joi');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = app;
