var http = require('http'),
    fs = require('fs'),
    config = require('../config.js'),
    log = require(config.helpers + 'log.js')(__filename);

var options = {
  host: config.login.captchaHost, 
  path: config.login.captchaPath, 
  headers: {"user-agent": config.login.ua}
};

module.exports = function(request, respond)
{
  var req = http.request(options, function(res){
    log('Getting captcha...');
    var f = fs.createWriteStream(config.login.captchaSavePath + '/captcha.jpg', 
                             {flags: "a", encoding: 'binary'});
                             
    res.on('data', function(data){
      f.write(data);
    })
  
    res.on('end', function(){
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
