module.exports = function(app){
  app.get('/auth', require('./routes/auth'));
  app.get('/query', function(){console.log('querying')});
}