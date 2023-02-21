const authorize = require('../middleware/authorize');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { User, validate } = require('../models/user');
const admin = require('../middleware/admin');
const { length } = require('joi/lib/types/binary');

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

router.put('/:id', [authorize], async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let { name, email, password } = req.body;

  let user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send('User with the given id was not found.');

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user.name = name;
  (user.password = password), (user.email = email), await user.save();

  res.send(user);
});

router.delete('/:id', [authorize, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send('User with the given id was not found.');

  res.send(user);
});
module.exports = router;
