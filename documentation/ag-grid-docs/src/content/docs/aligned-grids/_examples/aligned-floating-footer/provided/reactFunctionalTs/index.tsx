import React, { StrictMode, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { ColDef, GridReadyEvent, SizeColumnsToContentStrategy } from 'ag-grid-community';
import {
    AlignedGridsModule,
    ClientSideRowModelModule,
    ColumnAutoSizeModule,
    ModuleRegistry,
    NumberFilterModule,
    RowStyleModule,
    TextFilterModule,
    ValidationModule,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import './styles.css';

ModuleRegistry.registerModules([
    TextFilterModule,
    NumberFilterModule,
    ColumnAutoSizeModule,
    RowStyleModule,
    AlignedGridsModule,
    ClientSideRowModelModule,
    ValidationModule /* Development Only */,
]);

const bottomData = [
    {
        athlete: 'Total',
        age: '15 - 61',
        country: 'Ireland',
        year: '2020',
        date: '26/11/1970',
        sport: 'Synchronised Riding',
        gold: 55,
        silver: 65,
        bronze: 12,
    },
];

const GridExample = () => {
    const topGrid = useRef<AgGridReact>(null);
    const bottomGrid = useRef<AgGridReact>(null);

    const defaultColDef: ColDef = useMemo(
        () => ({
            filter: true,
            flex: 1,
            minWidth: 100,
        }),
        []
    );

    const columnDefs: ColDef[] = useMemo(
        () => [
            { field: 'athlete', width: 200 },
            { field: 'age', width: 150 },
            { field: 'country', width: 150 },
            { field: 'year', width: 120 },
            { field: 'date', width: 150 },
            { field: 'sport', width: 150 },
            {
                headerName: 'Total',
                colId: 'total',
                valueGetter: 'data.gold + data.silver + data.bronze',
                width: 200,
            },
            { field: 'gold', width: 100 },
            { field: 'silver', width: 100 },
            { field: 'bronze', width: 100 },
        ],
        []
    );

    const autoSizeStrategy = useMemo<SizeColumnsToContentStrategy>(
        () => ({
            type: 'fitCellContents',
        }),
        []
    );

    const { data, loading } = useFetchJson('https://www.ag-grid.com/example-assets/olympic-winners.json');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className="example-container">
            <div style={{ flex: '1 1 auto' }}>
                <AgGridReact
                    ref={topGrid}
                    alignedGrids={[bottomGrid]}
                    rowData={data}
                    loading={loading}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    suppressHorizontalScroll
                    alwaysShowVerticalScroll
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>

            <div style={{ flex: 'none', height: '60px' }}>
                <AgGridReact
                    ref={bottomGrid}
                    alignedGrids={[topGrid]}
                    rowData={bottomData}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    headerHeight={0}
                    alwaysShowVerticalScroll
                    rowStyle={{ fontWeight: 'bold' }}
                />
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <GridExample />
    </StrictMode>
);
