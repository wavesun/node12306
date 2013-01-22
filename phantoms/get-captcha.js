/*
* Used to capture the captcha as a image to serve
* Params:
*   from config:
*      (string) config.phantom.login.url: the url that contains captcha
*      (string) config.phantom.login.captchaSelector: selector to obtain the captcha
*   from stdin:
*      (int) arg[1]: index of process spawned
*/
var webpage = require('webpage'),
    sys = require('system'),
    config = require('../config.js');

var url = config.phantom.login.url,
    selector = config.phantom.login.captchaSelector,
    selectorCtx = config.phantom.login.captchaSelectorCtx,
    selectorIndex = config.phantom.login.captchaSelectorIndex,
    captchaPath = config.phantom.login.captchaPath,
    index = parseInt(sys.args[1])?sys.args[1]:0, // process index (used to save captcha and cookie)
    reloadCounter = 0,
    page = webpage.create();//create page

function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}

function opened(status){
  if(status != "success")
    reload();
}

function reload(){
  console.log("loading " + reloadCounter + " time");
  page.close();
  if(reloadCounter < 100)
  {
    reloadCounter ++;
    page = webpage.create();
    page.open(url, opened);
    page.onLoadFinished = onLoadFinished;
  }
  else
    console.log("Can't access target page, please check your network activity or try it later");
}

page.open(url, opened);
page.onLoadFinished = onLoadFinished;

function onLoadFinished(status){
    var pos = evaluate(page, onLoad, selector, selectorCtx, selectorIndex);
    console.log(sys.args[1]);
    if(!pos.hasOwnProperty("top"))
      return reload();
    page.clipRect = pos;
    page.render(captchaPath + '/p' + index + '.png');
    page.close();
    phantom.exit();
}

function onLoad(selector, ctx, index){
  var elem;
  if(typeof $ == 'undefined'){
    return document.head.innerHTML;
  }
  if(ctx)
  {
    if(ctx.match(/\$/))
      $ctx = eval(ctx); //handle ctx like $("#main").content()
    else
      $ctx = ctx//keep the original param
    elem = $(selector, $ctx);
  }
  else
    elem = $(selector);

  if(index)
    elem = elem.eq(index);

  if(elem.length)
  {
    pos = elem.offset();
    return {
      top: pos.top + 36, //in the iframe context, the offset top is relative to the current iframe, add the top bar
      left: pos.left,
      height: elem.height(),
      width: elem.width()
    }
  }
  else
    return $ctx;
}

phantom.onError = function(msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
        });
    }
    console.error(msgStack.join('\n'));
};
