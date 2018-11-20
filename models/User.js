const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  twitterProvider: {
    type: {
      id: String,
      token: String,
      tokenSecret: String
    },
    select: false
  },
  image: {
    type: String
  },
  username: {
    type: String
  }
});

module.exports = User = mongoose.model('User', UserSchema);
