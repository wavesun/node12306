var http = require('http'),
    qs = require('querystring'),
    fs = require('fs'),
    ps = require('child_process'),
    _  = require('underscore'),
    config = require('../config.js'),
    cookie = require(config.helpers + '/cookie.format.js'),
    getUserInfo = require('./get-user-info.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports = function(tickets, request, respond){
/*
station_train_code:G106
train_date:2013-01-28
seattype_num:
from_station_telecode:AOH
to_station_telecode:VNP
include_student:00
from_station_telecode_name:上海
to_station_telecode_name:北京
round_train_date:2013-01-28
round_start_time_str:00:00--24:00
single_round_type:1
train_pass_type:QB
train_class_arr:QB#D#Z#T#K#QT#
start_time_str:00:00--24:00
lishi:05:35
train_start_time:07:15
trainno4:5l0000G10620
arrive_time:12:50
from_station_name:上海虹桥
to_station_name:北京南
from_station_no:01
to_station_no:10
ypInfoDetail:O*****0114M*****01169*****0025
mmStr:756E8008D2F857065C1A4FC98D04E7BBF1733035019F8AD2C8632351
*/
/*
["G104", "05:30", "07:10", "5l0000G10412", "AOH", "VNP", "12:40", "上海虹桥", "北京南", "01", "09", "O*****0001M*****0014", "9A664CCB02D504D78902B2491AEB91424769E653A6EFEA82AFB349F0", "H1"]
*/

  //post confirm
  var ticket = tickets[0], formData = ticket.formData;
  log('Trying ticket:' + JSON.stringify(ticket));
  var reqData = qs.stringify({
    station_train_code: formData[0],
    train_date: global._date,
    seattype_num:"",
    from_station_telecode: formData[4],
    to_station_telecode: formData[5],
    include_student: "00",
    from_station_telecode_name: formData[7],
    to_station_telecode_name: formData[8],
    round_train_date: global._date,
    round_start_time_str: "00:00--24:00",
    single_round_type: "1",
    train_pass_type: "QB",
    train_class_arr: "QB#D#Z#T#K#QT#",
    start_time_str: "00:00--24:00",
    lishi: formData[1],
    train_start_time: formData[2],
    trainno4: formData[3],
    arrive_time: formData[6],//test
    from_station_name: formData[7],
    to_station_name: formData[8],
    from_station_no: formData[9],
    to_station_no: formData[10],
    ypInfoDetail: formData[11],
    mmStr: formData[12],
    locationCode: formData[13],
  }),
  opt = {
    host: "dynamic.12306.cn",
    path: "/otsweb/order/querySingleAction.do?method=submutOrderRequest",
    headers: {
      'Cookie': global.cookieString,
      'Referer': 'https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init',
      'Origin': 'https://dynamic.12306.cn',
      'User-Agent': config.login.ua,
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Charset': 'UTF-8,*;q=0.5',
      'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': reqData.length,
    },
    method: 'POST'
  }
  console.log(reqData);
  console.log(opt);

  var req = http.request(opt, function(res){
    var data = "";
    log('status: ' + JSON.stringify(res.headers)); 
    
    res.on('data', function(chunk){
      data += chunk;
    })

    res.on('end', function(){
      require('./get-user-info.js')(ticket, function(userInfo, ticketInfo){
        log('Got User Info: ' + JSON.stringify(userInfo));
        log('Confirming Order...');
        require('./order-init.js')(userInfo, ticketInfo, request, respond);
      })
    })

  });
 
  req.write(reqData)
 
  req.on('error', function(err){
    log(err);
  })
  
  req.end()

}

function test(token, ticketStr){
  //Request URL:https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=checkOrderInfo&rand=96ev
}
