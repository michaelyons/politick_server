const express = require('express');
const router = express.Router();
const passport = require('passport');
const Joi = require('joi');

var Twitter = require('twitter');

const User = require('../../models/User');

//request token
router.get('/login', passport.authenticate('twitter'));

//return token
router.get(
  '/return',
  passport.authenticate('twitter', { session: false }),
  async (request, response) => {
    const { _id } = request.user;
    return response.redirect(
      `https://informant-lobby.herokuapp.com/?user=${_id}`
    );
  }
);

//tweet post request
router.post('/posttweet', async (request, response) => {
  const user = await User.findById(request.body.userId).select(
    'twitterProvider'
  );

  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_KEY_SECRET,
    access_token_key: user.twitterProvider.token,
    access_token_secret: user.twitterProvider.tokenSecret
  });

  client
    .post('statuses/update', {
      status: request.body.status
    })
    .then(function(tweet) {
      console.log(tweet);
    })
    .catch(function(err) {
      console.log(err.message);
    });
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
