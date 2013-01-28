/*
* init order, caller get-ticket callee order-check
*/

var http = require('http'),
    qs = require('querystring'),
    _  = require('underscore'),
    cheerio = require('cheerio'),
    config = require('../config.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports = function(userInfo, ticketInfo, request, respond, callback){
  log('Init order...');
  var opt = {
    host: 'dynamic.12306.cn',
    path: '/otsweb/order/confirmPassengerAction.do?method=init',
    headers: _.extend(config.headersBase, {
      'Host': 'dynamic.12306.cn',
      'Pragma': 'no-cache',
      'Referer': 'https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init',
      'Cookie': global.cookieString,
      })
  }
  
  var req = http.request(opt, function(res){
    var data = '';

    res.on('data', function(chunk){
      data += chunk;
    })

    res.on('end', function(){
      if(data.match(/\w{32}/))
      {
        $ = cheerio.load(data);
        token = data.match(/\w{32}/)[0];
        ticketStr = $("input[name=leftTicketStr]").attr("value");
        if(!ticketStr)
        {
          log('Cannot find ticket str');
          return ;
        }
        require('./order-check.js')(userInfo, ticketInfo, token, ticketStr);
      }
    })
  })

  req.on('error', function(err){
    console.log(err);
  })

  req.end()
}
