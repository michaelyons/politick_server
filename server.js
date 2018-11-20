const express = require('express');
const app = express();
require('dotenv').config();

const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./routes/api/users');
const twitter = require('./routes/api/twitter');

//CORS
app.use(cors());

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Passport Session
app.use(session({ resave: false, saveUninitialized: true, secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_KEY_SECRET,
      callbackURL: 'https://ml-politick-server.herokuapp.com/twitter/return',
      includeEmail: true
    },
    function(token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan on');
}

//Routes
app.use('/api/users', users);
app.use('/twitter', twitter);

app.get('/', (request, response) => {
  response.send('werks');
});

//Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
