var http = require('http'),
    _ = require('underscore'),
    config = require('../config.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports = function(ticketInfo, callback){
  var opt={
    host: "dynamic.12306.cn",
    path: "/otsweb/order/confirmPassengerAction.do?method=getpassengerJson",
    headers: {
      'User-Agent': config.login.ua,
      'Cookie': global.cookieString,
      'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      'Accept-Charset': "UTF-8,*;q=0.5",
      'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Origin': 'https://dynamic.12306.cn',
      'Host': 'dynamic.12306.cn',
      'Pragma': 'no-cache'
    }
  }
  
  var req = http.request(opt, function(res){
    var data="";
    res.on('data', function(chunk){
      data += chunk;
    })
    res.on('end', function(){
      data = JSON.parse(data);
      data = data.passengerJson[0];
      console.log(data);
      callback.call(null, data, ticketInfo);
    })
  })

  req.on('error', function(err){
    console.log(err);
  })

  req.end();
}
