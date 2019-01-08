const
  express = require('express'),
  passport = require('passport'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  cors = require('cors'),
  flash = require("express-flash"),
  userDataMiddleware = require('../middlewares/userDataMiddleware'),
  isLogedin = (req, res, next) => {
    console.log(`isLogedin = ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  };


module.exports = (app) => {
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(session({
    secret: 'vadimled22051967@_RishonLeZion',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
  }))
  app.use(flash());
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.post('/auth/registry',
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
    (req, res, next) => {
      passport.authenticate('local-login',
        {
          successRedirect: '/auth/login',
          failuerFlash: true
        },
        (err, user) => {
          const errors = {
            loginError: req.flash('loginError'),
            passwordError: req.flash('passwordError'),
            emailError: req.flash('emailError')
          };
          
          if (err) {
            console.log("Login Err: ", errors);
            
            return res.send({
              status: 500,
              redirectTo: '/register'
            });
          } else if (!user) {
            console.log("Login !user: ", errors);
            return res.send({
              status: 400,
              errors,
            });
          } else if (user) {
            req.logIn(user, err => {
              if (err) {
                return res.send({
                  status: 500,
                  redirectTo: '/register'
                });
              }
              res.redirect('/auth/login');
            })
            
          } else {
            console.log("Login Next: ", {
              loginError: req.flash('loginError'),
              passwordError: req.flash('passwordError'),
              emailError: req.flash('emailError')
            });
            next();
          }
        })(req, res, next);
    });
  
  app.get('/auth/login',
    isLogedin,
    userDataMiddleware,
    (req, res) => {
      res.send(req.user)
    })
  
  app.get('/api/profile',
    isLogedin,
    (req, res) => {
      res.send(req.user)
    });
};

