const express = require('express');
const router = express.Router();

const User = require('../models/User');

// GET /register
router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    res.send('You are not authorized to view this page');
  }
  User.findById(req.session.userId).exec((err, user) => {
    if (err) {
      res.send('There is an error!');
    } else {
      console.log(user);
      res.render('profile', {
        title: 'Profile',
        name: user.name,
        email: user.email,
      });
    }
  });
});

module.exports = router;
