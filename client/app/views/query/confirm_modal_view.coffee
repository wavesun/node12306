CheckListView = require '/views/form/checkbox_list_view/index'
SearchModalView = require './modal_view'
config = require '/config/config'

module.exports = class ConfirmModalView extends Backbone.View
  
  template: require './templates/confirm_modal'

  events:
    'click #confirm-order': 'confirm'
    'click #re-search': 'reSearch'

  initialize: =>
    @collection = @options.collection
    @date = @options.date
    @render()

  render: =>
    @$el.html @template()
    @

  reSearch: =>
    modal = new SearchModalView
    $("#query-modal").html modal.$el

  confirm: =>
    seatType = []
    @$(".seat-type .btn").each ->
      if $(this).hasClass('active')
        seatType.push $(this).attr('value')

    data =
      date: @date
      seatTypt: seatType
      trains: @collection.toJSON()

    
    console.log data
    $.ajax
      url: config.api.baseUrl + '/queryleft'
      data: data
      type: 'POST'
      success: (res)=>
        res
