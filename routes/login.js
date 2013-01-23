var http = require('http'),
    fs = require('fs'),
    ps = require('child_process'),
    config = require('../config.js'),
    cookie = require(config.helpers + '/cookie.format.js'),
    log = require(config.helpers + '/log.js')(__filename);

var cookiePath = config.cookiePath;

module.exports = function(request, respond){
  fs.readFile(cookiePath + '/cookie.txt', 'utf-8', function(err, data){
      if(err)
          return log('read cookie file error');
      cookies = cookie.file2Array(data);
      respond.json(cookies);
  }); 
}

