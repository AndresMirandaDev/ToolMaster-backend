const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Tool, validate } = require('../models/tool');

router.get('/', async (req, res) => {
  const tools = await Tool.find();
  res.send(tools);
});

module.exports = router;
