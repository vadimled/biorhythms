const
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('users'),//User is a "Model Class" like Table in SQL
  UsersData = mongoose.model('usersData'),
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
      try {
        console.log(`profile - ${JSON.stringify(profile)}`);
        const existingUser = await User.findOne({email: profile.emails[0].value});
        console.log(`existingUser - ${JSON.stringify(existingUser)}`);
        
        if (!existingUser) {
          return done(null, false); //error (calls the passport.authenticate callback)
        } else {
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;
            existingUser.photo = profile.photos[0].value;
            existingUser.save((err) => {
              if (err)
                throw err;
              else
                return done(null, existingUser);
            });
          } else {
            return done(null, existingUser);
          }
        }
      } catch (e) {
        console.log(`Unauthorized - error: ${e}`);
        return done('Unauthorized');
      }
    })
);
