const express = require('express');
const router = express.Router();

const User = require('../models/User');

// GET /logout
router.get('/', (req, res, next) => {
  if (req.session) {
    // delete the session object
    req.session.destroy((err) => {
      if (err) {
        res.next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
