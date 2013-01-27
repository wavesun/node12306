module.exports = function(app){
  app.get('/captcha', require('./routes/captcha.js'));
  app.post('/auth', require('./routes/login.js'));
  app.post('/query', require('./routes/query.js'));
  app.post('/queryleft', require('./routes/query-left.js'));
  app.get('/logout', require('./routes/logout.js'));
  app.get('/query', function(){console.log('querying')});
}
