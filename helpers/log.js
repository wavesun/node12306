module.exports = function(filename, msg){
  return function(msg){
    console.log(filename + ': ' + msg);
  }
}
