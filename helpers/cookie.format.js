/*
* Handles cookies
* -setCookie2File: setCookie, file
    write cookies from response.header['set-cookie'] to file use std curl cookie file format
* -file2Array: fileString 
    read curl std cookie file to array
* -array2String: array 
    convert the array returned by file2Array to cookie string 
*/

var fs = require('fs'),
    config = require('../config.js'),
    log = require(config.helpers + '/log.js')(__filename),
    _string = require('underscore.string');

module.exports.setCookie2File = function(setCookie, file){
  var cookies = [], fileString = "";
  if(setCookie && setCookie.length)
    setCookie.forEach(function(v, i){
      var cols, key, value, path;
      cols = v.split(';');
      if(cols.length == 2)
      {
        key = _string.trim(cols[0].split('=')[0]);
        value = _string.trim(cols[0].split("=")[1]);
        path = _string.trim(cols[1].split("=")[1]);
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

  fileString = fileString.substr(0, fileString.length - 2);

  fs.writeFile(file, fileString, function(err){ 
    if(err) 
      log('saving cookies error: ' + err); 
    else 
      log('successfully saved cookies'); 
  });

  return fileString;
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

module.exports.array2String = function(array){
  var cookieString = "";
  if(!array instanceof Array)
  {
    log('Param passed to array2String is not an array', 2);
    return ;
  }
  array.forEach(function(v, i){
    cookieString += v.key + "=" + v.value + "; "
  })
  return cookieString;
}
