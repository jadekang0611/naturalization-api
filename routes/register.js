const express = require('express');
const router = express.Router();

// GET /register
router.get('/', (req, res, next) => {
  res.render('register', { title: 'Sign Up' });
});

router.post('/', (req, res, next) => {
  res.send('A new user is created!');
});

module.exports = router;
