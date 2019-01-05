const
  passport = require('passport'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  // UsersData = mongoose.model('usersData'),
  userDataMiddleware = require('../middlewares/userDataMiddleware');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  
  app.get('/auth/google',
    (req, res, next) => {
      // console.log(`/auth/google': req.data = ${JSON.stringify(req.data)}`);
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
      console.log(`/auth/google/callback': req.user = ${JSON.stringify(req.user)}`);
      console.log(`/auth/google/callback': res.data = ${JSON.stringify(req.data)}`);
      //if(req.user)
      res.redirect('/');
    }
  );
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  //app.get('/api/current_user', (req, res) => res.send(req.user));
  app.get('/api/current_user',
    userDataMiddleware,
    (req, res) => {
      console.log(`api/current_user': res.user = ${JSON.stringify(req.user)}`);
      console.log(`api/current_user': res.data = ${JSON.stringify(res.data)}`);
      
      res.send(req.user)
    });
};

