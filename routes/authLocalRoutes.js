const
  passport = require('passport'),
  bodyParser = require('body-parser'),
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
    (req, res, next) => {
      passport.authenticate('local-login',
        {
          successRedirect: '/auth/login',
          failuerFlash: false
        },
        (err, user, val2, status) => {
          // console.log(`============ ...args [${err}, ${user}, ${val2}, ${status} ]`);
          if (err) {
            return res.send({
              status: 404,
              redirectTo: '/register'
            });
          } else if (!user) {
            return res.send({
              status: 400,
              redirectTo: '/register'
            });
          } else if (user) {
             return res.send({
               user,
               status: 200,
               redirectTo: '/auth/login'
             });
            
          } else {
            // console.log(`============ user ${user}`);
            next();
          }
        })(req, res, next);
    });
  app.get('/auth/login', (req, res) => {
    console.log(`get('/auth/login'): req.data = ${JSON.stringify(req.data)}`);
    res.send(req.data)
  })
  
  /*app.get('/api/logout', (req, res) => {
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
*/
};

