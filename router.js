fs = require('fs');

module.exports = function(app){
  //client
  app.get('/', function(req, res){
    fs.readFile('./client/public/index.html', 'utf-8', function(err, data){
      if(err)
        return res.send('无法读取index.html，你或许需要到/应用文件夹/client/ 中执行brunch b -m');
      res.send(data);
    })
  })
  //api
  app.get('/captcha', require('./routes/captcha.js'));
  app.post('/auth', require('./routes/login.js'));
  app.post('/query', require('./routes/query.js'));
  app.post('/queryleft', require('./routes/query-left.js'));
  app.get('/logout', require('./routes/logout.js'));
  app.get('/query', function(){console.log('querying')});
}
