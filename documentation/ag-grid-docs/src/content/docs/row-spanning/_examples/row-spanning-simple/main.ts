import type { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import {
    CellSpanModule,
    ClientSideRowModelModule,
    ModuleRegistry,
    ValidationModule,
    createGrid,
} from 'ag-grid-community';

ModuleRegistry.registerModules([CellSpanModule, ClientSideRowModelModule, ValidationModule /* Development Only */]);

const columnDefs: ColDef[] = [
    { field: 'country', spanRows: true, sort: 'asc' },
    { field: 'year', spanRows: true, sort: 'asc' },
    { field: 'sport', spanRows: true, sort: 'asc' },
    { field: 'athlete' },
    { field: 'age' },
    { field: 'total' },
];

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
    },
    enableCellSpan: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    gridApi = createGrid(gridDiv, gridOptions);
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data));
});
