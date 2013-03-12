config = require '/config/config'

module.exports = class confirmedTrains extends Backbone.Collection
  model = new Backbone.Model
  defaults:
    end_station_name: ''
    end_time: ''
    id: ''
    start_station_name: ''
    start_time: ''
    value: ''
  url: config.api.baseUrl + '/queryleft'
