Application = require 'application'

$ ->
  app = new Application()
  app.initialize()
  Backbone.history.start()
