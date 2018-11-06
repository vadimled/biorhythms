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
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id});
      if (existingUser) {
        //we already have a record with the given ID
        return done(null, existingUser); // say to Passport - Ok, the action ended, here the "existingUser"
      }
      const user = await new User({googleId: profile.id, name: profile.name.givenName}).save();// Model Instance
      done(null, user);
    })
);

