import type { CellClassRules, GridApi, GridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, createGrid } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const ragCellClassRules: CellClassRules = {
    // apply green to electric cars
    'rag-green': (params) => params.value === true,
};

const gridOptions: GridOptions = {
    rowData: [
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
        { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
        { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
        { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
        { make: 'Fiat', model: '500', price: 15774, electric: false },
        { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
        { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false },
        { make: 'Volvo', model: 'EX30', price: 33795, electric: true },
        { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false },
        { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false },
        { make: 'Fiat', model: 'Panda', price: 13724, electric: false },
        { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true },
    ],
    columnDefs: [
        {
            field: 'make',
        },
        { field: 'model' },
        { field: 'price', filter: 'agNumberColumnFilter' },
        {
            field: 'electric',
            cellClassRules: ragCellClassRules,
        },
    ],
    defaultColDef: {
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        flex: 1,
    },
    rowClassRules: {
        // apply red to Ford cars
        'rag-red': (params) => params.data.make === 'Ford',
    },
    rowSelection: {
        mode: 'multiRow',
        headerCheckbox: false,
    },
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    const gridApi = createGrid(gridDiv, gridOptions);
});
