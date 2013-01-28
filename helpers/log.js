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
        var logFile = new Date().getTime()
        msg = filename + '\n\n' + msg;
        fs.writeFile('log/' + logFile + '.log', msg ,function(err){
          if(err)
            console.log(err);
          else
            console.log('Wrote log file:' + logFile);
        })
        return ;
      default:
        status = "Log:";
      break;
    }
    
    console.log(status + '\t' + msg + '\t' + filename + '\n');  
  }
}
