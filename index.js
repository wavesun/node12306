global.__basename = __dirname;

express = require('express');
require('express-resource');
config = require('./config');

app = module.exports = express();

/****
* App Setup
****/
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
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