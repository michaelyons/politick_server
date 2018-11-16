const express = require('express');
const router = express.Router();
const passport = require('passport');
// const Joi = require('joi');

// var Twitter = require('twitter');

// const User = require('../models/User');

//REQUEST TOKEN
// router.get('/login', passport.authenticate('twitter'));

router.get('/test', (req, res) => res.json({ msg: 'twitter werks' }));

module.exports = router;
