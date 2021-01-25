const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const middleware = require('../middleware');

const User = require('../models/User');

// GET /register
router.get('/', middleware.loggedOut, (req, res, next) => {
  res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/', async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.password) {
    // HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // CREATE A NEW USER
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const saveduser = await user.save();
      req.session.userId = user._id;
      return res.redirect('/admin/profile');
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
