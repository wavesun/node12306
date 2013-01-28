var http = require('http'),
    qs = require('querystring'),
    fs = require('fs'),
    ps = require('child_process'),
    _  = require('underscore'),
    config = require('../config.js'),
    cookie = require(config.helpers + '/cookie.format.js'),
    getTicketInfo = require(config.helpers + '/get-ticket-info.js'),
    log = require(config.helpers + '/log.js')(__filename);

var cookiePath = config.cookiePath;

module.exports = function(request, respond){
  query(request, respond);
}

//query left tickets
function query(request, respond)
{
  
  /* query params:
  {"date":"xxx","seatTypt":["1","M"],"trains":[{"end_station_name":"北京西","end_time":"18:21","id":"6i00000G7200","start_station_name":"深圳北","start_time":"07:56","value":"G72"},{"end_station_name":"北京西","end_time":"13:27","id":"6300000T1643","start_station_name":"广州","start_time":"16:48","value":"T16"}]}
  */

  //if there're more than one trains selected, query all and match the selected ones,
  //while if there's one train selected ,query train number
  var train_no = "";
  if(request.body.trains.length == 1)
    train_no = request.body.trains[0].id

  //store the selected ids
  var trainIDs = _.pluck(request.body.trains, 'id');


  var queryData = qs.stringify({
      "method": "queryLeftTicket",
      "orderRequest.train_date": global._date, 
      "orderRequest.from_station_telecode": global._fromStationCode,
      "orderRequest.to_station_telecode": global._toStationCode,
      "orderRequest.train_no": train_no,
      "trainPassType": "QB",
      "trainClass": "QB#D#Z#T#K#QT#",
      "includeStudent": "00",
      "seatTypeAndNum": "",
      "orderRequest.start_time_str": "00:00--24:00",
      });

  var opt = {
    host: "dynamic.12306.cn",
    path: "/otsweb/order/querySingleAction.do?" + queryData,
    headers: {
      'User-Agent': config.login.ua,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init',
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Length': queryData.length,
      'Cookie': global.cookieString
    }
  }
  
  console.log(queryData);

  var req = http.request(opt, function(res){
      data = "";
      res.on('data', function(chunk){
        data += chunk;
        })
      res.on('end', function(){
        if(data=='-10')
        {
          log('Login expires', 2);
          return ;
        }
        ticketInfo = getTicketInfo(data);
        
        //now only find ones in selection
        if(trainIDs.length > 0)
          ticketInfo.forEach(function(v, i){
            if(!_.contains(trainIDs, v.trainID))
              ticketInfo.splice(i,1);            
          })
        
        if(ticketInfo.length > 0)
        {
          log('Yeeeea!')
          require('./get-ticket.js')(ticketInfo, request, respond); 
        }
        
        //console.log(JSON.stringify(ticketInfo));
        respond.send(ticketInfo);
      })
  })

  req.on('error', function(err){
      console.log(err);
  })

  req.end();
}
