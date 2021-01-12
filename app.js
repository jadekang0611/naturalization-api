const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

// Import Routes
const cardsRoute = require('./routes/cards');
const registerRoute = require('./routes/register');

// Middlewares
app.use(bodyParser.json());
app.use('/cards', cardsRoute);
app.use('/register', registerRoute);

// view engine setup
app.set('view engine', 'pug');
app.set('views', 'views');

// Create ROUTES
app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Home',
    message: 'Welcome, Jade',
    footer: 'Make sure to maintain the app well!',
  });
});

// Connect to my DB
mongoose.connect(
  process.env.DB_CONNECTIONS,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('DB connected')
);

// Add a method to listen to my server
const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`My app is running on port ${PORT}.`);
});
