const express = require('express');
const router = express.Router();
const Joi = require('joi');

const User = require('../../models/User');

router.get('/', async (request, response) => {
  const users = await User.find();
  if (users.length < 1) {
    response.status(404).send('No users found homie');
  }
  response.send(users);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    return response.status(404).send('No user with given ID found');
  }
  response.json(user);
});

router.delete('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    return response.status(404).send('No user with given ID found');
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  response.send(user);
});

const userValidate = user => {
  const schema = {
    name: Joi.string()
      .min(2)
      .required(),
    twitterProvider: Joi.object().keys({
      twitter_id: Joi.string()
    }),
    image: Joi.string()
  };
  return Joi.validate(user, schema);
};

module.exports = router;
