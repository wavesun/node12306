var config = require('../config.js'),
    log = require(config.helpers + '/log.js')(__filename);

module.exports.setCookie2File = function(setCookie){
  var cookies = [], fileString = "";
  if(setCookie.length)
    setCookie.forEach(function(v, i){
      var cols, key, value, path;
      cols = v.split(';');
      if(cols.length == 2)
      {
        key = cols[0].split('=')[0];
        value = cols[0].split("=")[1];
        path = cols[1].split("=")[1];
      }
      cookies.push({
        key: key,
        value: value,
        path: path,
      });
    })
  cookies.forEach(function(v, i){
    fileString += 'dynamic.12306.cn\tFALSE\t' + v.path + '\tFALSE\t0\t' + v.key + '\t' + v.value + '\r';
  })
  return fileString.substr(0, fileString.length - 2);
}

module.exports.file2Array = function(fileString){
  var cookies=[], cookieStrings = fileString.split('\r');
  if(!cookieStrings.length)
    return log("no cookies to handle", -1);
  cookieStrings.forEach(function(v, i){
      var cols = v.split('\t');
      if(v.length > 0 && cols.length != 7)
      {
        log('col length: ' + cols.length);
        log("malformatted cookie file", -1);
        return false;
      }
      cookies.push({
        domain: cols[0],
        path: cols[2],
        key: cols[5],
        value: cols[6]
      })
  })
  return cookies;
}
