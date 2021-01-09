const express = require('express');

const app = express();

// Create ROUTES
app.get('/', (req, res, next) => {
  res.send('We are at home');
});

// Add a method to listen to my server
app.listen(3000);
