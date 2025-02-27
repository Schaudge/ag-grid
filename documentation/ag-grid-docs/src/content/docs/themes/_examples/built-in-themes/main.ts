import type { ColDef, GridOptions, Theme } from 'ag-grid-community';
import { ModuleRegistry, createGrid, themeAlpine, themeBalham, themeMaterial, themeQuartz } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const themes: Record<string, Theme> = {
    quartz: themeQuartz,
    material: themeMaterial,
    balham: themeBalham,
    alpine: themeAlpine,
};
const theme = themeQuartz;

const columnDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];

const rowData: any[] = (() => {
    const rowData: any[] = [];
    for (let i = 0; i < 10; i++) {
        rowData.push({ make: 'Toyota', model: 'Celica', price: 35000 + i * 1000 });
        rowData.push({ make: 'Ford', model: 'Mondeo', price: 32000 + i * 1000 });
        rowData.push({ make: 'Porsche', model: 'Boxster', price: 72000 + i * 1000 });
    }
    return rowData;
})();

const defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
};

const gridOptions: GridOptions<IOlympicData> = {
    theme: theme,
    columnDefs,
    rowData,
    defaultColDef,
    sideBar: true,
};

const gridApi = createGrid(document.querySelector<HTMLElement>('#myGrid')!, gridOptions);

function setBaseTheme(id: string) {
    gridApi.setGridOption('theme', themes[id]);
}
