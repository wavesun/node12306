DatepickerView = require '/views/form/datepicker_view/index'
ModalView = require './modal_view'
Model = require '/models/query'
StationTrainsCollection = require '/models/stationTrains'
StationTrainsListView = require './station_trains_list_view'

module.exports = class QueryPageView extends Backbone.View
  template: require './templates/page'

  events: 
    'click .confirm-query': 'query'

  initialize: =>
    @modalView = new ModalView

  render: =>
    console.log 'render query page'
    @$el.html @template()
    @$("#query-modal").append @modalView.$el
    return @

  query: =>
    data= @$('#query-modal').toObject()
    model = new Model data
    model.save(null, success: (model, res)=>
      # 未登录
      if res.status is -1
        bootbox.alert 'X( 登陆失效,现在跳转到登陆页'
        router.navigate 'home', trigger: true
        return
      
      # 未找到车站
      else if res.status is 0
        bootbox.alert res.data
        return

      list = new StationTrainsCollection res.data
      listView = new StationTrainsListView
        collection: list
      @$('#select-res').html listView.$el
    )

    confirmTrain: =>
      @
