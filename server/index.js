const
  express = require('express'),
  PORT = process.env.PORT || 5000,
  app = express();

require('./services/passport');
require('./routes/authRoutes')(app);

app.listen(PORT);
