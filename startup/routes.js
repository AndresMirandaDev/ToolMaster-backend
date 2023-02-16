const express = require('express');
const tools = require('../routes/tools');
const users = require('../routes/users');
const auth = require('../routes/auth');
const morgan = require('morgan');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/tools', tools);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  app.use(morgan('dev'));

  app.use(error);
};
