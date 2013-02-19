/*
* pre-check order, calls from order-init
*/
var http = require('https'),
    qs = require('querystring'),
    ps = require('child_process'),
    _  = require('underscore'),
    cheerio = require('cheerio'),
    config = require('../config.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports = function(userInfo, ticketInfo, token, ticketStr){
  log('Pre-check order...');
  log('Got struts token: ' + token);
  log('Got ticket str: ' + ticketStr);
  /*
  Log:  {"first_letter":"LORNECHANG","isUserSelf":"","mobile_no":"13798999803","old_passenger_id_no":"","old_passenger_id_type_code":"","old_passenger_name":"","passenger_flag":"0","passenger_id_no":"410184199206075615","passenger_id_type_code":"1","passenger_id_type_name":"","passenger_name":"张强","passenger_type":"1","passenger_type_name":"","recordCount":"3"} /node12306/routes/order-check.js

  Log:  {"trainID":"5l0000G10412","trainNO":"G104","shangwu":0,"tedeng":0,"yideng":999,"erdeng":999,"gaojiruanwo":0,"ruanwo":0,"yingwo":0,"ruazuo":0,"yingzuo":0,"wuzuo":0,"qita":0,"formData":["G104","！历时！05:30","！发车时！07:10","5l0000G10412","AOH","VNP","！到时！12:40","上海虹桥","北京南","01","09","O*****0178M*****0027","6F5AFCC3FD38798C807A9D315A74FCE4EBFE4FE1925A99260AE7F6E0","H1"]}  /node12306/routes/order-check.js
  */

  var postData = qs.stringify({
    "org.apache.struts.taglib.html.TOKEN": token,
    "leftTicketStr": ticketStr,
    "textfield": "中文或拼音首字母",
    "checkbox0": "0",
    "orderRequest.train_date": global._date,
    "orderRequest.train_no": ticketInfo.trainID,
    "orderRequest.station_train_code": ticketInfo.trainNO,
    "orderRequest.from_station_telecode": ticketInfo.formData[4],
    "orderRequest.to_station_telecode": ticketInfo.formData[5],
    "orderRequest.seat_type_code": "",
    "orderRequest.ticket_type_order_num": "",
    "orderRequest.bed_level_order_num": "000000000000000000000000000000",
    "orderRequest.start_time": ticketInfo.formData[2],
    "orderRequest.end_time": ticketInfo.formData[6],
    "orderRequest.from_station_name": ticketInfo.formData[7],
    "orderRequest.to_station_name": ticketInfo.formData[8],
    "orderRequest.cancel_flag": "1",
    "orderRequest.id_mode": "Y",
    "passengerTickets": "M,0,1," + userInfo.passenger_name + ",1," + userInfo.passenger_id_no + "," + userInfo.mobile_no +",Y",
    "oldPassengers": "",
    "passenger_1_seat": "M",
    "passenger_1_ticket": "1",
    "passenger_1_name": userInfo.passenger_name,
    "passenger_1_cardtype": "1",
    "passenger_1_cardno": userInfo.passenger_id_no,
    "passenger_1_mobileno": userInfo.mobile_no,
    "checkbox9": "Y",
    "randCode": global.captcha,
    "orderRequest.reserve_flag": "A",
    "tFlag": "dc",
  });  //https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=confirmSingleForQueue
  var header = _.extend({}, config.headersBase);
  var opt = {
    host: 'dynamic.12306.cn',
    path: '/otsweb/order/confirmPassengerAction.do?method=checkOrderInfo&rand=' + global.captcha,
    headers: _.extend(header, {
      "Accept": "application/json, text/javascript, */*",
      "X-Requested-With": "XMLHttpRequest",
      "Referer": "https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=init",
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
      "Cookie": global.cookieString,
    }),
    method: "POST",
  }

  log(JSON.stringify(qs.parse(postData), null, 4) + '\n' + JSON.stringify(opt, null, 4), 5);

  var req = http.request(opt, function(res){
    var data = "";
    res.on("data", function(chunk){
      data += chunk;
    })
    res.on('end', function(){
      console.log(data);
      orderCountQueue = require('./order-count-queue.js')(userInfo, ticketInfo, token, ticketStr)
    })
  })

  req.write(postData);

  req.on('error', function(err){
    console.log(err);
  })

  req.end();
}
