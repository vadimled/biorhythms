const
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({hi: 'There'})
});

app.listen(PORT);
