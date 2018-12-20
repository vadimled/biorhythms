const
  passport = require('passport'),
  bodyParser = require('body-parser'),
  axios = require('axios'),
  cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  
  app.post(
    '/auth/registry',
    passport.authenticate('local-signup' , {
      successRedirect : '/auth/login',
      failuerRedirect : '/authRoutes/auth/registry',
      failuerFlash: true
    }), function(req, res, next)  {
    
      console.log(req.body + " app.post");
      // res.redirect('/')
    }
  );
  
  
   app.get( '/auth/login',
    (req, res) => {
      console.log(req.user);
      if (req.user) {
        res.send(req.user)
      }
    }
  );
  
  /*app.post('/auth/login', passport.authenticate('local-login', {
    failureRedirect : '/login',
    failureFlash : false // allow flash messages
  }));
  
  */
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
