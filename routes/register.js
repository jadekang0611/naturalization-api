const express = require('express');
const router = express.Router();

const User = require('../models/User');

// GET /register
router.get('/', (req, res, next) => {
  res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/', async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.password) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const saveduser = await user.save();
      return res.redirect('/profile');
    } catch (e) {
      res.status(500).json({ message: e });
    }
  } else {
    const err = new Error('All fields are required');
    err.status = 400;
    return next(err);
  }
  // use schema's create method to insert document into MongoDB
});

module.exports = router;
