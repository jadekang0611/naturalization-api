const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv/config');

// Import Routes
const cardsRoute = require('./routes/cards');
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');
const signinRoute = require('./routes/signin');

// Middlewares

// use sessions for tracking logins
app.use(
  session({
    secret: 'I love you',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/cards', cardsRoute);
app.use('/register', registerRoute);
app.use('/profile', profileRoute);
app.use('/signin', signinRoute);

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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Something went wrong');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// Connect to my DB
// mongoose.connect(
//   process.env.DB_CONNECTIONS,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   () => console.log('DB connected')
// );

// mongoDB connection for testing mode
mongoose.connect('mongodb://localhost:27017/mydb');
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// Add a method to listen to my server
const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`My app is running on port ${PORT}.`);
});
