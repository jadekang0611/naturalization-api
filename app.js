const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

// Import Routes
const cardsRoute = require('./routes/cards');

// Middlewares
app.use(bodyParser.json());
app.use('/cards', cardsRoute);

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My app is running on port ${PORT}.`);
});
