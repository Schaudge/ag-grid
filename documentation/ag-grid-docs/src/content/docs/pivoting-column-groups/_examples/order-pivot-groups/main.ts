import type { GridApi, GridOptions } from 'ag-grid-community';
import {
    ClientSideRowModelModule,
    ColDef,
    ColGroupDef,
    ModuleRegistry,
    ValidationModule,
    createGrid,
} from 'ag-grid-community';
import { PivotModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([ClientSideRowModelModule, PivotModule, ValidationModule /* Development Only */]);

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
    columnDefs: [
        { field: 'country', rowGroup: true },
        { field: 'sport', pivot: true, pivotComparator: (a: string, b: string) => b.localeCompare(a) },
        { field: 'gold', aggFunc: 'sum' },
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 130,
    },
    autoGroupColumnDef: {
        minWidth: 200,
    },
    pivotMode: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    gridApi = createGrid(gridDiv, gridOptions);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data));
});
