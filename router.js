module.exports = function(app){
  app.get('/captcha', require('./routes/captcha.js'));
  app.post('/auth', require('./routes/login.js'));
  app.get('/query', function(){console.log('querying')});
}
