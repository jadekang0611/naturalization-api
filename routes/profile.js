const express = require('express');
const router = express.Router();

const User = require('../models/User');

// GET /register
router.get('/', (req, res, next) => {
  res.send('Profile page');
});

module.exports = router;
