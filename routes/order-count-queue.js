/*
* get queue status, caller order-check, callee order-queue
*/
var http = require('https'),
    qs = require('querystring'),
    ps = require('child_process'),
    _  = require('underscore'),
    cheerio = require('cheerio'),
    config = require('../config.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports = function(userInfo, ticketInfo, token, ticketStr){  

  log('Counting queue...');

  /*
  Log:  {"first_letter":"LORNECHANG","isUserSelf":"","mobile_no":"13798999803","old_passenger_id_no":"","old_passenger_id_type_code":"","old_passenger_name":"","passenger_flag":"0","passenger_id_no":"410184199206075615","passenger_id_type_code":"1","passenger_id_type_name":"","passenger_name":"张强","passenger_type":"1","passenger_type_name":"","recordCount":"3"} /node12306/routes/order-check.js

  Log:  {"trainID":"5l0000G10412","trainNO":"G104","shangwu":0,"tedeng":0,"yideng":999,"erdeng":999,"gaojiruanwo":0,"ruanwo":0,"yingwo":0,"ruazuo":0,"yingzuo":0,"wuzuo":0,"qita":0,"formData":["G104","！历时！05:30","！发车时！07:10","5l0000G10412","AOH","VNP","！到时！12:40","上海虹桥","北京南","01","09","O*****0178M*****0027","6F5AFCC3FD38798C807A9D315A74FCE4EBFE4FE1925A99260AE7F6E0","H1"]}  /node12306/routes/order-check.js
  */
  //https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=confirmSingleForQueue
  var queryData = {
    method: "getQueueCount",
    train_date: global._date,
    train_no: ticketInfo.trainID,
    station: ticketInfo.trainNO,
    seat: "M",
    from: ticketInfo.formData[4],
    to: ticketInfo.formData[5],
    ticket: ticketStr,
  }

  console.log(JSON.stringify(queryData, null, 4));

  queryData = qs.stringify(queryData);
  var header = _.extend({}, config.headersBase);
  var opt = {
    host: 'dynamic.12306.cn',
    path: '/otsweb/order/confirmPassengerAction.do?' + queryData,
    headers: _.extend(header, {
      "Accept": "application/json, text/javascript, */*",
      //"Accept-Encoding": "gzip,deflate,sdch",
      "X-Requested-With": "XMLHttpRequest",
      "Referer": "https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=init",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": global.cookieString,
    }),
  }

  console.log(JSON.stringify(opt, null, 4));


  var req = http.request(opt, function(res){
    var data = "";
    res.on("data", function(chunk){
      data += chunk;
    })
    res.on('end', function(){
      console.log(data);
      require('./order-queue.js')(userInfo, ticketInfo, token, ticketStr);
    })
  })

  req.on('error', function(err){
    console.log(err);
  })

  req.end();
}
