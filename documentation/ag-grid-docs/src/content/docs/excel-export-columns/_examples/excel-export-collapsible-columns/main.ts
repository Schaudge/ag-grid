import type { ColDef, ColGroupDef, GridApi, GridOptions } from 'ag-grid-community';
import {
    ClientSideRowModelModule,
    CsvExportModule,
    ModuleRegistry,
    NumberFilterModule,
    TextFilterModule,
    ValidationModule,
    createGrid,
} from 'ag-grid-community';
import { ColumnMenuModule, ContextMenuModule, ExcelExportModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule,
    ExcelExportModule,
    ColumnMenuModule,
    ContextMenuModule,
    TextFilterModule,
    NumberFilterModule,
    ValidationModule /* Development Only */,
]);

const columnDefs: (ColDef | ColGroupDef)[] = [
    {
        headerName: 'Athlete Details',
        children: [
            {
                field: 'athlete',
                width: 180,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'age',
                width: 90,
                filter: 'agNumberColumnFilter',
            },
            { headerName: 'Country', field: 'country', width: 140 },
        ],
    },
    {
        headerName: 'Sports Results',
        children: [
            { field: 'sport', width: 140 },
            {
                columnGroupShow: 'closed',
                field: 'total',
                width: 100,
                filter: 'agNumberColumnFilter',
            },
            {
                columnGroupShow: 'open',
                field: 'gold',
                width: 100,
                filter: 'agNumberColumnFilter',
            },
            {
                columnGroupShow: 'open',
                field: 'silver',
                width: 100,
                filter: 'agNumberColumnFilter',
            },
            {
                columnGroupShow: 'open',
                field: 'bronze',
                width: 100,
                filter: 'agNumberColumnFilter',
            },
        ],
    },
];

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
    defaultColDef: {
        filter: true,
    },
    // debug: true,
    columnDefs: columnDefs,
    defaultExcelExportParams: {
        allColumns: true,
    },
};

function onBtExport() {
    gridApi!.exportDataAsExcel();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    gridApi = createGrid(gridDiv, gridOptions);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data));
});
