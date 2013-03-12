ItemView = require './station_trains_item_view'
ConfirmModalView = require './confirm_modal_view'
ConfirmCollection = require '/models/confirmed'

module.exports = class StationTrainsListView extends Backbone.View

  initialize: =>
    @confirmCollection = new ConfirmCollection
    @render()
    confirmModal = new ConfirmModalView
      collection:  @confirmCollection
      date: $("#query-modal input[name=date]").val()
    $("#query-modal").html confirmModal.$el

  render: =>
    console.log @confirmCollection
    @collection.forEach (model, i)=>
      itemView = new ItemView
        model: model
        collection: @confirmCollection
      @$el.append itemView.$el
    @

