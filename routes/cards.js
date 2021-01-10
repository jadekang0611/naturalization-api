const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Do you see my question?');
});

module.exports = router;
