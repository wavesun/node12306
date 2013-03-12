config = require '/config/config'

module.exports = class Query extends Backbone.Model

  defaults:
    date: ""
    from: ""
    to: ""

  url: config.api.baseUrl + '/query'
