const
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('users'),//User is a "Model Class" like Table in SQL
  keys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
      .then(existingUser => {
        if (existingUser) {
          //we already have a record with the given ID
          done(null, existingUser); // say to Passport - Ok, the action ended, here the "existingUser"
        }
        else {
          new User({googleId: profile.id, name: profile.name.givenName})// Model Instance
            .save()
            .then(user => done(null, user));
        }
      })
    
  })
);

