HomePageView = require 'views/home/page_view'
QueryPageView = require 'views/query/page_view'
config = require 'config/config'

module.exports = class Router extends Backbone.Router

  routes:
    '': 'home'
    '/': 'home'
    'home': 'home'
    'query': 'query'
    'logout': 'logout'

  home: ->
    homePageView = new HomePageView()
    $('#main-container').html homePageView.el
    homePageView.render()

  query: ->
    queryPageView = new QueryPageView()
    $('#main-container').html queryPageView.el
    queryPageView.render()

  logout: =>
    $.ajax
      url: config.api.baseUrl + '/logout'
      success: (res)=>
        @navigate 'home', trigger:true
