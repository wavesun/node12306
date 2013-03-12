module.exports = class RadioView extends Backbone.View

  template: require './templates/radio'
  
  tagName: 'label'

  className: 'radio'
    
  defaults:
    name: 'input'
    text: ''
    value: ''
    selected: null
    inline: false
    checkedStyle: 'input-checked-green'

  events:
    'click': 'checked'
  
  initialize: =>
    @options = _.defaults @options, @defaults
    @model.bind 'change', @render
    @render()

  render: =>
    @$el.addClass 'inline' if @options.inline
    @$el.addClass @options.checkedStyle if @options.selected
    @$el.html @template 
      model: @model.toJSON()
      name: @options.name
      text: @options.text
      value: @options.value
      selected: @options.selected
      checkedStyle: @options.checkedStyle
    this

  checked: (e) =>
    $(e.currentTarget.parentElement.children).removeClass(@options.checkedStyle)
    $(e.currentTarget).addClass @options.checkedStyle
