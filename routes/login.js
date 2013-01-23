var http = require('http'),
    qs = require('querystring'),
    fs = require('fs'),
    ps = require('child_process'),
    config = require('../config.js'),
    cookie = require(config.helpers + '/cookie.format.js'),
    log = require(config.helpers + '/log.js')(__filename);

var cookiePath = config.cookiePath;

module.exports = function(request, respond){

  if(!request.body.usr || !request.body.pwd || !request.body.captcha){
    log('No login param set!', 2);
    return ;
  }

  fs.readFile(cookiePath + '/cookie.txt', 'utf-8', function(err, data){
      //handle cookies
      if(err)
        return log('read cookie file error', 2);
      cookies = cookie.file2Array(data);//read cookie from file (previosly set when getting captcha)
      cookieString = cookie.array2String(cookies);//format curl cookie file to cookie string
     
      //get rand
      var options = {
        host: config.login.randHost,
        path: config.login.randPath,
        headers: {
          "Cookie": cookieString,
          "User-Agent": config.login.ua,
        },
      }
      var req = http.request(options, function(res){
        log('Getting login rand...');
        var chunk = "";
        res.on("data", function(data){
          chunk += data;
        })
        res.on("end", function(){
          if(res.headers['set-cookie'])
            cookie.setCookie2File(res.headers['set-cookie'], config.cookiePath + '/cookie.txt');
          var rand = JSON.parse(chunk);
          log('Got rand ' + rand.loginRand, 1);
          rand = rand.loginRand;
          postLogin(request, respond, rand, cookieString);
        })
      })

      req.on('error', function(err){
        console.log(err);
      })

      req.end();
  }); 
}

function postLogin(request, respond, rand, cookies){
/*
loginRand:756
refundLogin:N
refundFlag:Y
loginUser.user_name:
nameErrorFocus:
user.password:
passwordErrorFocus:
randCode:rsxr
randErrorFocus:
*/  
  var usr = request.body.usr, pwd = request.body.pwd, captcha = request.body.captcha;
  var data = qs.stringify({
    "loginRand": rand,
    "refundLogin": 'N',
    "refundFlag": 'Y',
    "loginUser.user_name": usr,
    "nameErrorFocus": '',
    "user.password": pwd,
    "passwordErrorFocus": '',
    "randCode": captcha,
    "randErrorFocus": '',
  });
  var option = {
    host: config.login.formHost,
    path: config.login.formPath,
    headers: {
      'User-Agent': config.login.ua,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length, 
      'Cookie': cookies 
    },
    method: 'POST'
  };

  var req = http.request(option, function(res){
    var data = "";
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      data += chunk; 
    })
    res.on('end', function(){
      if(res.headers['set-cookie'])
        cookie.setCookie2File(res.headers['set-cookie'], config.cookiePath + '/cookie.txt'); 
      respond.send(data);
    })
  }) 

  req.write(data);

  req.on('error', function(err){
    console.log(err);
  })

  req.end();
}
