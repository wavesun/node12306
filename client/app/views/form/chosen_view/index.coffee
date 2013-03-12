require './lib/chosen.jquery'

module.exports = class ChosenView extends Backbone.View

  template: require './templates/chosen'

  defaults:
    name: null
    placeholder: null
    multiple: null
    defaultValue: null
    span: null
    value: null
    text: null
    groupBy: null
    subText: null
    selected: null
    disabled: false
    allowDeselect: true
  
  events:
    'change select': 'saveSelected'
    
  initialize: ->
    @options = _.extend @defaults, @options
    @selected = @options.defaultValue
    @collection.bind 'reset', @render
    @render()
    
  render: =>
    @$el.html @template
      collection: @collection?.toJSON()
      multiple: @options.multiple
      placeholder: @options.placeholder
      span: @options.span ? 'span4'
      name: @options.name
      value: @options.value
      text: @options.text
      groupBy: @options.groupBy
      subText: @options.subText
      selected: if _.isArray(@selected) then @selected else [@selected]
      disabled: @options.disabled
    @$('select').chosen
      allow_single_deselect: @options.allowDeselect
    this
    
  saveSelected: =>
    @selected = @$('select').val()