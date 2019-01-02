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

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(`profile - ${JSON.stringify(profile.id)}`);
        const existingUser = await User.findOne({googleId: profile.id});
        console.log(`existingUser - ${JSON.stringify(existingUser)}`);
        
        if (!existingUser) {
          return done(null, false); //error (calls the passport.authenticate callback)
        } else {
          return done(null, existingUser);
        }
      } catch (e) {
        console.log(`done(null, null)`);
        return done('Unauthorized');
      }
    })
);
/*
console.log(profile && profile.email);
const existingUser = await User.findOne({googleId: profile.id});
if (existingUser) {
  console.log("say to Passport - Ok, the action ended, here the \"existingUser\"")
  //we already have a record with the given ID
  return done(null, existingUser); // say to Passport - Ok, the action ended, here the "existingUser"
}
console.log("say to Passport - Do user")
// const user = await new User({googleId: profile.id, name: profile.name.givenName}).save();// Model Instance
done(null, null);
})
)
;*/


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
/*
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
    console.log(`profile -  ${JSON.stringify(profile)}`);
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


*/

