/*
* Now let's start finding tickets!
*/
var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    fs = require('fs'),
    ps = require('child_process'),
    cheerio = require('cheerio'), //parse HTML
    _string = require('underscore.string'), //handle string manipulation
    config = require('../config.js'),
    cookie = require(config.helpers + '/cookie.format.js'),
    queryStationCode = require(config.helpers + '/queryStationCode.js'),
    log = require(config.helpers + '/log.js')(__filename);

var cookiePath = config.cookiePath;

module.exports = function(request, respond){
  var criteria = {
        trainNo: request.body.trainNo,
        date: request.body.date,
        from: request.body.from,
        to: request.body.to,
        scope: url.parse(request.url, true).query,
      };
  log('Got criteria: ' + criteria);

  /*
  if(!global.login)
  {
    log('not logged in', 2);
    respond.json({status: -1, data: "haven't login yet"});
    return ;
  }
  */

  fs.readFile(cookiePath + '/cookie.txt', 'utf-8', function(err, data){
    if(err)
      return log('read cookie file error', 2);
    cookies = cookie.file2Array(data);
    cookieString = cookie.array2String(cookies);

    queryTrains(cookieString, respond);
    //query(cookieString, respond);
  })

  //query trains
  function queryTrains(cookieString, respond){
    //query stations
    var fromStation = queryStationCode(criteria.from),
        toStation = queryStationCode(criteria.to);
    if(!fromStation.length || !toStation.length)
    {
      respond.json({status: 0, data: "X( 没有找到你要求的车站..."})
      log('Query station not found', 2);
      return ;
    }

    var queryData = qs.stringify({
      "date": criteria.date,
      "fromstation": fromStation[0].code,
      "tostation": toStation[0].code,
      "starttime": "00:00--24:00",
    }),
    opt = {
      host: "dynamic.12306.cn",
      path: "/otsweb/order/querySingleAction.do?method=queryststrainall",
      headers: {
        "User-Agent": config.login.ua,
        'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Length": queryData.length,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init",
        "Cookie": cookieString,
      },
      method: "POST",
    };
    
    //globalize vars to use in confirmation action
    global._date = criteria.date;
    global._fromStationCode = fromStation[0].code;
    global._fromStationName = fromStation[0].name;
    global._toStationCode = toStation[0].code;
    global._toStationName = toStation[0].name;

    var req = http.request(opt, function(res){
      var data = "";
      res.on('data', function(chunk){
        data+=chunk;
      })
      res.on('end', function(){
        if(data.substr(0,1)!=='[')
        {
          respond.json({status: 0, data: '格式不正确...'})
          log('Wrong param sent', 2)
          return ;
        }
        respond.json({status: 1, data: JSON.parse(data)});
      })
    });
    req.write(queryData);
    req.on("error", function(err){
      console.log(err);
    })
    req.end()
  }
  
}
