DatepickerView = require '/views/form/datepicker_view/index'

module.exports = class ModalView extends Backbone.View

  template: require './templates/modal'
  
  initialize: =>
    @render()

  render: =>
    @$el.append @template()
    datePicker = new DatepickerView
      placeholder: "选择乘车时间"
    @$("#input-date").html datePicker.$el
    return @
