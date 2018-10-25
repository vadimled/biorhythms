const
  express = require('express'),
  mongoose = require('mongoose'),
  keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const
  app = express(),
  PORT = process.env.PORT || 5000;

require('./routes/authRoutes')(app);

app.listen(PORT);
