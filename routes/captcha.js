var http = require('http'),
    fs = require('fs'),
    config = require('../config.js'),
    log = require(config.helpers + 'log.js')(__filename);

module.exports = function(request, respond)
{
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
      //handle cookies
      var setCookie = res.headers['set-cookie'], cookies = [], cookieString = "";
      if(setCookie.length)
        setCookie.forEach(function(v, i){
          var cols, key, value, path;
          cols = v.split(';');
          if(cols.length == 2)
          {
            key = cols[0].split('=')[0];
            value = cols[0].split("=")[1];
            path = cols[1].split("=")[1];
          }
          cookies.push({
            key: key,
            value: value,
            path: path,
          });
        })
      cookies.forEach(function(v, i){
        cookieString += 'dynamic.12306.cn\tFALSE\t' + v.path + '\tFALSE\t0\t' + v.key + '\t' + v.value + '\r';
      })
      fs.writeFile(config.cookiePath + '/cookie.txt', cookieString, function(err){
        if(err)
          log('saving cookies error: ' + err);
        else
          log('successfully saved cookies');
      });

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