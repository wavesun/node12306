/*
* Used to capture the captcha as a image to serve
* Params:
*   from config:
*      (string) config.phantom.login.url: the url that contains captcha
*      (string) config.phantom.login.captchaSelector: selector to obtain the captcha
*   from stdin:
*      (int) arg[1]: index of process spawned
*/
var page = require('webpage').create(),
    sys = require('system'),
    config = require('../config.js');

var url = config.phantom.login.url,
    selector = config.phantom.login.captchaSelector,
    captchaPath = config.phantom.login.captchaPath,
    index = parseInt(sys.args[1])?sys.args[1]:0;

function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}
    
page.open(url, function(status){
  var pos = evaluate(page, function(selector){
    var elem = $(selector);
    if(elem.length)
    {
      pos = elem.offset();
      return {
        top: pos.top,
        left: pos.left,
        height: elem.height(),
        width: elem.width()
      }
    }
    else
      return selector//false;//$("html").html();
  },selector)
  page.clipRect = pos;
  page.render(captchaPath + '/p' + index + '.png');
  phantom.exit()
})
