config = require '/config/config'
module.exports = class Login extends Backbone.Model
  
  defaults:
    usr: ""
    pwd: ""
    captcha: ""
    ps: 0

  url: config.api.baseUrl + '/auth'

  