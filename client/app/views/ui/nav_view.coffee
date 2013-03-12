module.exports = class NavView extends Backbone.View
  
  template: require './templates/nav'

  initialize: =>
    @render()

  render: =>
    @$el.html @template()
    return this