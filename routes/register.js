const express = require('express');
const router = express.Router();

// GET /register
router.get('/', (req, res, next) => {
  res.send('Register today!');
});

module.exports = router;
