import { ExcelExportParams, ExcelHeaderFooterConfig, ExcelHeaderFooterContent, GridOptions } from '@ag-grid-community/core'

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  popupParent: document.body,
}

const getValues = (type: string) => {
  const value = (document.querySelector('#' + type + 'Value') as HTMLInputElement).value

  if (value == null) {
    return
  }

  const obj: ExcelHeaderFooterContent = {
    value: value,
  }

  obj.position = (document.querySelector('#' + type + 'Position') as HTMLInputElement).value as 'Left' | 'Center' | 'Right';

  const fontName = (document.querySelector('#' + type + 'FontName') as HTMLInputElement).value
  const fontSize = (document.querySelector('#' + type + 'FontSize') as HTMLInputElement).value
  const fontWeight = (document.querySelector('#' + type + 'FontWeight') as HTMLInputElement).value
  const underline = (document.querySelector('#' + type + 'Underline') as HTMLInputElement).checked

  if (
    fontName !== 'Calibri' ||
    fontSize != '11' ||
    fontWeight !== 'Regular' ||
    underline
  ) {
    obj.font = {}
    if (fontName !== 'Calibri') {
      obj.font.fontName = fontName
    }
    if (fontSize != "11") {
      obj.font.size = Number.parseInt(fontSize)
    }
    if (fontWeight !== 'Regular') {
      if (fontWeight.indexOf('Bold') !== -1) {
        obj.font.bold = true
      }
      if (fontWeight.indexOf('Italic') !== -1) {
        obj.font.italic = true
      }
    }

    if (underline) {
      obj.font.underline = 'Single'
    }
  }

  return obj
}

const getParams: () => ExcelExportParams | undefined = () => {
  const header = getValues('header')
  const footer = getValues('footer')

  if (!header && !footer) {
    return undefined;
  }

  const obj: ExcelExportParams = {
    headerFooterConfig: {
      all: {},
    },
  }

  if (header) {
    obj.headerFooterConfig!.all!.header = [header]
  }

  if (footer) {
    obj.headerFooterConfig!.all!.footer = [footer]
  }

  return obj
}

function onBtExport() {
  gridOptions.api!.exportDataAsExcel(getParams())
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then(response => response.json())
    .then(data =>
      gridOptions.api!.setRowData(data.filter((rec: any) => rec.country != null))
    )
})
