var fs = require('fs');

module.exports = function(filename){
  var spliter = '/', arr, length;
  if(filename.indexOf('/') == -1)
    spliter = "\\";
  arr = filename.split(spliter);
  length = arr.length;
  if(length > 3)
    filename = '/' + arr[length - 3] + '/' + arr[length - 2] + '/' + arr[length - 1]
  return function(msg, status){
    switch(status){
      case 1:
        status = 'Log:';
      break;
      case 2:
        status = "Waring:";
      break;
      case -1:
        status = "Fatal:";
      break;
      case 5:
        fs.writeFile('log/' + new Date().getTime() + '.log', msg ,function(err){
          console.log(err);
        })
      default:
        status = "Log:";
      break;
    }
    if(status !== 5)
      console.log(status + '\t' + msg + '\t' + filename + '\n');
    else // write log
      console.log('Write log: ' + new Date().getTime());
  }
}
