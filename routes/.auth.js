var phantom = require('phantomjs').path,
    _string = require('underscore.string'),
    child_process = require('child_process'),
    config = require(__basename+'/config');

var config = ' --cookies-file=' + config.phantom.cookiePath + '/cookies.txt --disk-cache=true --ignore-ssl-errors=true --web-security=false ',
    index = 0,
    psA = [];
console.log(config);

function killPhantoms(psA){
  psA.forEach(function(o, i){
    o.kill('SIGKILL');
  })
}

module.exports = function(req, res)
{
  for(var i = 0; i < 5; i++)
  {
      ps = child_process.exec(
        'phantomjs' + config + ' phantoms/get-captcha.js ' + i,
        function(err, stdout, stderr)
        {
          if(err)
          {
            if(!err.signal)
            {
              res.send('Phantoms are dead');
              killPhantoms(psA);
            }
            else
              console.log(err);
          }
          else if(stderr)
          {
              res.send(stderr);
          }
          else
          {
            killPhantoms(psA);
            res.send('<img src="/captcha/p' + _string.trim(stdout) + '.png"/>');
          }
        }
      )
      psA.push(ps);
  }
}
