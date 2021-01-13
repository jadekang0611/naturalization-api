const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const User = require('../models/User');

// GET /register
// ADD the custom middleware to make it a more logical and simpler protected route
router.get('/', middleware.requiresSignin, (req, res, next) => {
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
