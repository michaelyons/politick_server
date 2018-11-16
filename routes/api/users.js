const express = require('express');
const router = express.Router();
// const Joi = require('joi');

router.get('/test', (req, res) => res.json({ msg: 'users werks' }));

// const User = require('../models/User');

// router.get('/', async (request, response) => {
//   const users = await User.find();
//   if (users.length < 1) {
//     response.status(404).send('No users found homie');
//   }
//   response.send(users);
// });

module.exports = router;
