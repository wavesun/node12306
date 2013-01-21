var phantom = require('phantomjs').path,
    child_process = require('child_process'),
    config = require(__basename+'/config');

var config = ' --cookies-file=' + config.phantom.cookiePath + '/cookies.txt --disk-cache=true --ignore-ssl-errors=true --web-security=false ',
    index = 0,
    psA = [];
console.log(config);

module.exports = function(req, res)
{
  for(var i = 0; i < 5; i++)
  {
      ps = child_process.exec(
        phantom + config + ' phantoms/get-captcha.js ' + i,
        function(err, stdout, stderr)
        {
          if(err)
            console.log(err);
          else if(stderr)
            console.log(stderr);
          else
          {
            psA.forEach(function(o, i){
              o.kill('SIGKILL');
            })
            res.send(stdout);
          }
        }
      )

      /*
      ps.stdout.on("data", function(data){
        ps.stdin.write(data);
      });

      ps.stderr.on("data", function(data){
        console.log('phantomJS stderr: ' + data);
      })

      ps.on('exit', function (code) {
        psA.forEach(function(o, i){
          o.kill('SIGKILL');
        })
        if (code !== 0) {
          console.log('phantomJS process exited with code ' + code);
        }
        ps.stdin.end();
      });
      */

      psA.push(ps);
  }
  /*
  psA.forEach(function(o, i){
    o.exec(phantom + ' ' + config + ' phantoms/get-captcha.js ' + i, function(err, stdout, stderr){
      if(err)
        console.log(err);
      else if(stderr)
        console.log(stderr);
      else
      {
        psA.forEach(function(o, i){
          console.log(o);
          o.send()
        })
        res.send(stdout);
      }
    })
  })
  */
}
