'use strict';

var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {}
  };
};

Router.prototype.get = function(route, cb) {
  this.routes['GET'][route] = cb;
};

Router.prototype.post = function(route, cb) {
  this.routes['POST'][route] = cb;
};

Router.prototype.route = function() {
  return (req, res) => {
    var routeFunction = this.routes[req.method][req.url];
    if ((this.routes.hasOwnProperty(req.method)) &&
        (this.routes[req.method].hasOwnProperty(req.url))) {
      routeFunction(req, res);
    } else {
      console.log('[' + req.method + '][' + req.url + '] not found');
    }
  };
};
