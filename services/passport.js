const
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  LocalStrategy = require('passport-local').Strategy,
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

/*passport.use(
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
);*/

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  async (req, email, password, done) => {
    //console.log(req.body, email, password);
    
    try {
      const existingUser = await User.findOne({email});
      if (existingUser) {
        //we already have a record with the given ID
        return done(null, existingUser); // say to Passport - Ok, the action ended, here the "existingUser"
      }
      const user = await new User();// Model Instance
      user.name = req.body.name;
      user.email = email;
      user.password = User.generateHash(password);
      
      const usersData = await new UsersData();// Model Instance
      usersData._user = user.id;
      usersData.birthday = req.body.birthday;
      usersData.gender = req.body.gender;
      if (req.body.birthTime)
        usersData.birthTime = req.body.birthTime;
      if (req.body.weight)
        usersData.weight = parseFloat(req.body.weight);
      
      usersData.save((err) => {
        if (err)
          throw err;
      });
      
      user.save((err) => {
        if (err)
          throw err;
        else
        return done(null, user);
      });
      
      
    } catch (err) {
      done(err, false)
    }
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
  }));
// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
passport.use('local-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',    // 'email' refers to the req.body.email submitted with login.ejs form where the <input name="email" ...>
  passwordField: 'password', // 'password' refers to the req.body.password submitted with login.ejs form where the <input name="password" ...>
  passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
}, function (req, email, password, done) {
  
  // we lookup a user with a matching 'email'
  User.findOne({email: email}).then(function (user) {
    // Note: the callback function 'done' is used here like 'return' to resume program execution.
    // it's first parameter is the error, if no error, we pass null.
    // the second parameter is the user object, if error, we pass false.
    // if no user found
    if (!user) {
      // this means fail the login
      return done(null, false);
    }
    
    // check password validity
    if (!user.validPassword(password)) {
      // this means fail login
      return done(null, false);
    }
    
    // otherwise, pass user object with no errors
    return done(null, user)
  }).catch(function (err) {
    done(err, false)
  });
}));
