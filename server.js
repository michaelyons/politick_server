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

app.use(helmet());

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

//Routes
app.use('/api/users', users);
app.use('/api/twitter', twitter);

app.get('/', (request, response) => {
  response.send('werks');
});

//Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
