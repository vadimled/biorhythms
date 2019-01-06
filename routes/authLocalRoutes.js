const
  express = require('express'),
  passport = require('passport'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  cors = require('cors'),
  userDataMiddleware = require('../middlewares/userDataMiddleware'),
  isLogedin = (req, res, next) => {
    console.log(`isLogedin: req = ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  } ;


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
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
  }))

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
          failuerFlash: false
        },
        (err, user) => {
           if (err) {
            return res.send({
              status: 500,
              redirectTo: '/register'
            });
          } else if (!user) {
            return res.send({
              status: 404,
              redirectTo: '/register'
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
            next();
          }
        })(req, res, next);
    });
  
  app.get('/auth/login',
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

