const
  express = require('express'),
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'),
  passport = require('passport'),
  keys = require('./config/keys');
require('./models/User');
require('./models/UsersData');
require('./services/passportGoogleStrategy');
require('./services/passportLocalStrategy');

const db = mongoose.connect(keys.mongoURI);
// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});


const
  flash = require("express-flash"),
  app = express(),
  PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys:[keys.cookieKey]
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authGoogleRoutes')(app);
require('./routes/authLocalRoutes')(app);

app.listen(PORT);
