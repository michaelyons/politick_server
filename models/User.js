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

//Add user to db
UserSchema.statics.upsertTwitterUser = function(
  token,
  tokenSecret,
  profile,
  callback
) {
  let that = this;
  return this.findOne({ 'twitterProvider.id': profile.id }, function(
    err,
    user
  ) {
    if (!user) {
      const newUser = new that({
        username: profile.username,
        image: profile.photos[0].value,
        twitterProvider: {
          id: profile.id,
          token: token,
          tokenSecret: tokenSecret
        }
      });
      newUser.save((err, savedUser) => {
        if (err) {
          console.log(err);
        }
        return callback(err, savedUser);
      });
    } else {
      return callback(err, user);
    }
  });
};

module.exports = User = mongoose.model('User', UserSchema);
