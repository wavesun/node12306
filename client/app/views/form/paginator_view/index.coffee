module.exports = class PaginatorView extends Backbone.View

  template: require './templates/paginator'

  events:
    'click .pagination a.number': 'gotoNumber'
    'click .pagination a.first': 'gotoFirstPage'
    'click .pagination a.last': 'gotoLastPage'
    'click .pagination a.previous': 'gotoPreviousPage'
    'click .pagination a.next': 'gotoNextPage'
  
  initialize: =>
    @render()

  render: =>
    @$el.html @template @collection

    this

  gotoNumber: (e) =>
    e.preventDefault()
    page = parseInt $(e.currentTarget).text()
    # console.log page
    @gotoPage e, page

  gotoFirstPage: (e) =>
    page = @collection.firstPage
    @gotoPage e, page

  gotoLastPage: (e) =>
    page = @collection.totalPages
    @gotoPage e, page

  gotoPreviousPage: (e) =>
    if @collection.currentPage > 1
      page = @collection.currentPage - 1
    else
      page = 1
    @gotoPage e, page

  gotoNextPage: (e) =>
    if @collection.currentPage < @collection.totalPages
      page = @collection.currentPage + 1
    else
      page = @collection.totalPages
    @gotoPage e, page

  gotoPage: (e, page) =>
    e.preventDefault()
    if $(e.currentTarget).parent().attr('class') != 'disabled'        
      @collection.currentPage = page
      @collection.fetch()