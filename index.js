global.__basename = __dirname;

var express = require('express')
require('express-resource');
var config = require('./config');

var app = module.exports = express();

/****
* App Setup
****/
app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.cookieSession({secret: 'whateverItsOnYourOwnPC'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('./middlewares/cors'));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  return app.use(express.errorHandler());
});

/*
* init routers
*/
require('./router')(app);

/*
* start server
*/
app.listen(config.web.port);
console.log("Express server listening on port %d in %s mode", config.web.port, app.settings.env)
