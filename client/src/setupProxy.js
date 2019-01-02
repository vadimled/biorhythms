const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/login', { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/registry', { target: 'http://localhost:5000' }));
  app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
};
