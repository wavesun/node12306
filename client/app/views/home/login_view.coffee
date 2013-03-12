module.exports = class LoginView extends Backbone.View
  
  template: require './templates/login'

  initialize: =>
    @render()

  render: =>
    @$el.html @template()
    this
