var http = require('http'),
    fs = require('fs'),
    config = require('../config.js'),
    cookie = require(config.helpers + 'cookie.format.js'),
    log = require(config.helpers + 'log.js')(__filename);

module.exports = function(request, respond)
{
  if(global.login)
    return respond.json(2);
  var options = {
    host: config.login.captchaHost, 
    path: config.login.captchaPath, 
    headers: {"user-agent": config.login.ua}
  };

  var req = http.request(options, function(res){
    log('Getting captcha...');
    var f = fs.createWriteStream(
        config.login.captchaSavePath + '/captcha.jpg', 
        {flags: "w", encoding: 'binary'}
    );

    res.on('data', function(data){
      f.write(data);
    })
  
    res.on('end', function(){
      var cookieString = cookie.setCookie2File(res.headers['set-cookie'], config.cookiePath + '/cookie.txt');
      f.end();
      log('Got captcha');
      respond.json(1);
    })
  });
  
  req.on('error', function(err){
    console.log(err);
    respond.json(0);
  })
  
  req.end();
}