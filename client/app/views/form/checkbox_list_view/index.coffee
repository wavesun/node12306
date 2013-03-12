CheckboxView = require './checkbox_view'

module.exports = class CheckboxListView extends Backbone.View

  template: require './templates/checkbox_list'

  defaults:
    name: 'input'
    text: null
    value: null
    inline: false
    defaultValue: []
    selectAll: false
    checkedStyle: 'input-checked-green'

  events:
    'click .btn': 'selectToggle'

  initialize: =>
    @options = _.defaults @options, @defaults  
    @selectAll = @options.selectAll
    @collection.on 'reset', @renderCheckbox
    @render()
    this
    
  render: =>
    @$el.html @template
      selectAll: @options.selectAll
    @renderCheckbox()
    
  renderCheckbox: =>
    $div = @$el.find('.form-checkbox-list')
    $div.empty()
    @collection.each (model) =>      
      checkboxView = new CheckboxView
        model: model
        name: @options.name
        text: @options.text
        value: @options.value
        inline: @options.inline
        checkedStyle: @options.checkedStyle
        selected: _.include(@options.defaultValue, model.get(@options.value)) || @options.selectAll
      $div.append checkboxView.render().el
      
  selectToggle: (e) =>
    e.preventDefault()
    $targetInput = $(e.currentTarget.parentElement).find('input:checkbox')
    $targetLabel = $(e.currentTarget.parentElement).find('label')
    @selectAll = ! @selectAll
    if @selectAll
      $targetInput.attr "checked", true
      $targetLabel.addClass @options.checkedStyle
      $(e.currentTarget).find('> font ').html('取消')
    else
      $targetInput.removeAttr "checked"
      $targetLabel.removeClass @options.checkedStyle
      $(e.currentTarget).find('> font ').html('全選')
    
  