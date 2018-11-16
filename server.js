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

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

app.get('/', (request, response) => {
  response.send('werks');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
