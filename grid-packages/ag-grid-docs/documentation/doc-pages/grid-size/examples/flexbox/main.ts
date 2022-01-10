import { GridOptions, GridReadyEvent } from '@ag-grid-community/core'

var rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 },
]

// let the grid know which columns and what data to use
const gridOptions: GridOptions = {
  columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],

  rowData: rowData,

  onGridReady: function (params: GridReadyEvent) {
    params.api.sizeColumnsToFit()

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit()
      })
    })
  },
}

document.addEventListener('DOMContentLoaded', function () {
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new agGrid.Grid(eGridDiv, gridOptions)
  gridOptions.api!.sizeColumnsToFit()
})
