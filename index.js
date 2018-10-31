const
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'),
  passport = require('passport'),
  keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const
  app = express(),
  PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send({hi: 'There!'})
});

app.listen(PORT);
/*
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'),
  passport = require('passport'),
  keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const
  app = express(),
  PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys:[keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(PORT);
*/
