const
  passport = require('passport'),
  bodyParser = require('body-parser'),
  axios = require('axios'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  UsersData = mongoose.model('usersData'),
  userDataMiddleware = require('../middlewares/userDataMiddleware');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  
  app.post(
    '/auth/registry',
    passport.authenticate('local-signup', {
      successRedirect: '/auth/registry',
      failuerRedirect: '/',
      failuerFlash: true
    })
  );
  
  app.get('/auth/registry',
    (req, res) => {
      if (req.user) {
        res.sendStatus(200)
      }
    }
  );
  
  app.post('/auth/login',
    passport.authenticate('local-login', {
      successRedirect: '/auth/login',
      failureRedirect: '/login',
      failureFlash: false
    }));
  
  
 app.get('/auth/login',
    userDataMiddleware,
    (req, res) => {
      console.log('req.data');
      if (req.data) {
        res.send(req.data)
       }
    }
  );
  
  app.get(
    '/auth/google',
    passport.authenticate('google',
      {scope: ['profile', 'email']},
    )
  );
  
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/api/current_user', (req, res) => res.send(req.user));
};
