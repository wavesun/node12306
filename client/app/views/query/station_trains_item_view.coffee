module.exports = class StationTrainsItmeView extends Backbone.View
  events:
    'click': 'selectTrain'
  
  tagName: "li"
  
  class: "station-train"

  template: require './templates/station_train'
  
  initialize: =>
    @render()

  render: =>
    @$el.html @template @model.toJSON() 
    @$('.tip').tooltip()
    @

  selectTrain: (e)=>
    el = $(e.currentTarget)
    if el.hasClass 'active'
      el.removeClass 'active'
      @collection.remove @model 
      return

    el.addClass 'active'
    @collection.add @model
