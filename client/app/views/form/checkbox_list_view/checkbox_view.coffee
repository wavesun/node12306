module.exports = class CheckboxView extends Backbone.View

  template: require './templates/checkbox'

  defaults:
    name: 'input'
    text: null
    value: null
    selected: false
    inline: false
    checkedStyle: 'input-checked-green'
  
  tagName: 'label'

  className: 'checkbox'

  events:
    'click': 'checked'
    'change': 'changed'

  initialize: =>
    @options = _.defaults @options, @defaults
    @model.on 'change', @render
    @render()
    @

  render: =>
    @$el.addClass 'inline' if @options.inline
    @$el.addClass @options.checkedStyle if @options.selected
    @$el.html @template 
      model: @model.toJSON()
      name: @options.name
      text: @options.text
      value: @options.value
      selected: @options.selected
    this

  checked: (e) =>
    if @$(e.currentTarget).find('input').attr('checked') == 'checked'
      @$(e.currentTarget).find('input').prop('checked', true)
    else
      @$(e.currentTarget).find('input').removeAttr 'checked'


  changed: (e) =>
    if $(e.currentTarget).find('input').attr('checked') == 'checked'
      $(e.currentTarget).addClass @options.checkedStyle
    else
      $(e.currentTarget).removeClass @options.checkedStyle

  