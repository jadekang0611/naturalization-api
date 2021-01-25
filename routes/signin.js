const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const middleware = require('../middleware');

// GET /login
router.get('/', middleware.loggedOut, (req, res, next) => {
  res.render('signin', { title: 'Log In' });
});
// POST /login
router.post('/', async (req, res, next) => {
  if (req.body.email && req.body.password) {
    // Checking if the emil exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('Email is not found.');
    // Checking if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).send('Invalid password!');
    req.session.userId = user._id;
    return res.redirect('/admin/profile');
  } else {
    return res.status(401).send('Email and password are required');
  }
});

module.exports = router;
