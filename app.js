const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

// Middlewares

// Create ROUTES
app.get('/', (req, res, next) => {
  res.send('We are at home');
});

// Connect to my DB
mongoose.connect(
  process.env.DB_CONNECTIONS,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('DB connected')
);

// Add a method to listen to my server
app.listen(3000);
