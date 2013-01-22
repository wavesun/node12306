module.exports = function(app){
  app.get('/captcha', require('./routes/captcha.js'));
  app.get('/query', function(){console.log('querying')});
}
