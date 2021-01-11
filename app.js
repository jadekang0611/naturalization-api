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
app.set('view engine', 'pug');
app.set('views', 'views');

// Create ROUTES
app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Admin Portal',
    message: 'Naturalization App Admin Portal',
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
