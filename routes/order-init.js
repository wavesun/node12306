var http = require('http'),
    qs = require('querystring'),
    fs = require('fs'),
    ps = require('child_process'),
    _  = require('underscore'),
    cheerio = require('cheerio'),
    config = require('../config.js'),
    cookie = require(config.helpers + '/cookie.format.js'),
    getUserInfo = require('./get-user-info.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports = function(cookieString, userInfo, request, respond, callback){
  var opt = {
    host: 'dynamic.12306.cn',
    path: '/otsweb/order/confirmPassengerAction.do?method=init',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Charset': 'UTF-8,*;q=0.5',
      //'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'dynamic.12306.cn',
      'Pragma': 'no-cache',
      'Referer': 'https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init',
      'Cookie': cookieString,
      'User-Agent': config.login.ua
    }
  }
  
  var req = http.request(opt, function(res){
    var data = '';

    res.on('data', function(chunk){
      data += chunk;
    })

    res.on('end', function(){
      if(data.match(/\w{32}/))
      {
        token = data.match(/\w{32}/)[0];
        ticketStr = data.match(/value="(\w{20})"/)[1];
        require('./order-check.js')()
      }
    })
  })

  req.on('error', function(err){
    console.log(err);
  })

  req.end()
}
