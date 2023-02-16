const authorize = require('../middleware/authorize');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { User, validate } = require('../models/user');

router.get('/me', authorize, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  //validate input
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  //checking if email is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send('User with given email already exists.');
  //creating new user
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  //encrypting password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['name', 'email', '_id']));
});

module.exports = router;
