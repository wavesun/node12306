RadioView = require './radio_view'

module.exports = class RadioListView extends Backbone.View

  template: require './templates/radio_list'

  defaults:
    name: 'input'
    text: ''
    value: ''
    inline: false
    defaultValue: null
    checkedStyle: 'input-checked-green'
    # checkedStyle可選顏色 red/green/blue/yellow/oringe/purple/pink

  initialize: =>
    @options = _.defaults @options, @defaults
    @collection.bind 'reset', @render
    @render()

  render: =>
    @$el.html @template()
    @renderRadio()
    
  renderRadio: =>
    $div = @$el.find('.form_radio_list')
    @collection.each (model) =>
      radioView = new RadioView
        model: model
        name: @options.name
        text: @options.text
        value: @options.value
        inline: @options.inline
        checkedStyle: @options.checkedStyle
        selected: @options.defaultValue == model.get(@options.value)
      $div.append radioView.render().el