module.exports = function(app){
  app.get('/auth', function(){console.log('authenticating')});
  app.get('/query', function(){console.log('querying')});
}