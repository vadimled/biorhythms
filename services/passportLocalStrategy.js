const
  passport = require('passport'),
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

// =========================================================================
// LOCAL REGISTERING =============================================================
// =========================================================================
passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  async (req, email, password, done) => {
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
  }));


// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',    // 'email' refers to the req.body.email submitted with login.ejs form where the <input name="email" ...>
    passwordField: 'password', // 'password' refers to the req.body.password submitted with login.ejs form where the <input name="password" ...>
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    
    const user = await User.findOne({email: email});
    try {
      if (!user) {
        console.log("this means fail the login");
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        console.log("this means fail password validity");
        return done(null, false);
      }
      console.log("pass user object with no errors");
      return done(null, user)
    } catch (err) {
      console.log("this means fail the login");
      return done(err, false)
    }
  })
);
