const
  passport = require('passport'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  userDataMiddleware = require('../middlewares/userDataMiddleware');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  
  app.get('/auth/google',
    (req, res, next) => {
      return passport.authenticate('google', {
          scope: ['profile', 'email']
        },
        (err) => {
          if (err) {
            res.redirect('/register');
          } else {
            next();
          }
        })(req, res, next);
    })
  
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/register'}),
    (req, res) => {
      res.redirect('/');
    }
  );
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/api/current_user',
    userDataMiddleware,
    (req, res) => {
      console.log(`api/current_user': res.user = ${JSON.stringify(req.user)}`);
      res.send(req.user)
    });
};

