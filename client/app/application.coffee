Router = require 'router'

module.exports = class Application

  initialize: ->

    # Instantiate the mediator
    Backbone.mediator = _.clone Backbone.Events

    # Instantiate the router
    window.router = new Router()

    # Freeze the object
    Object.freeze? this
