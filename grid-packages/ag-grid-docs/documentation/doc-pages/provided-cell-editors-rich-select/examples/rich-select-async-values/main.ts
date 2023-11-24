import {
  GridApi,
  createGrid,
  ColDef,
  GridOptions,
  IRichCellEditorParams,
  ICellEditorParams,
} from '@ag-grid-community/core';

const languages = ['English', 'Spanish', 'French', 'Portuguese', '(other)'];

function getRandomNumber(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getValueFromServer(params: ICellEditorParams): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(languages), 1000);
  });
}

const columnDefs: ColDef[] = [
  { 
    headerName: 'Rich Select Editor', 
    field: 'language', 
    cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: {
      values: getValueFromServer
    } as IRichCellEditorParams
  },
];

let gridApi: GridApi;

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 200,
    editable: true
  },
  columnDefs: columnDefs,
  rowData: new Array(100).fill(null).map(() => ({ language: languages[getRandomNumber(0, 4)] }))
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);
})
