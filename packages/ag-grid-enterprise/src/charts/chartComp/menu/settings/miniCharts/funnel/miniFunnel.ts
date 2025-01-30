import type { Shape } from 'ag-charts-types/scene';

import type { ChartType } from 'ag-grid-community';

import type { AgChartsExports } from '../../../../../agChartsExports';
import type { ChartTranslationKey } from '../../../../services/chartTranslationService';
import type { ThemeTemplateParameters } from '../../miniChartsContainer';
import { MiniChart } from '../miniChart';
import type { XYCoordShape } from '../miniChartApi';
import { createShapePaths } from '../miniChartHelpers';

const FUNNEL_SHAPES: XYCoordShape[] = [
    [
        [13, 16],
        [13, 12.0],
        [3, 12.0],
        [3, 16],
    ],
    [
        [12, 11],
        [12, 7],
        [4, 7],
        [4, 11],
    ],
    [
        [10.125, 6],
        [10.125, 1.5],
        [5.875, 1.5],
        [5.875, 6],
    ],
];

export class MiniFunnel extends MiniChart {
    static chartType: ChartType = 'funnel';

    protected shapes: Shape[];

    constructor(
        container: HTMLElement,
        agChartsExports: AgChartsExports,
        fills: string[],
        strokes: string[],
        _themeTemplateParameters: ThemeTemplateParameters,
        _isCustomTheme: boolean,
        tooltipName: ChartTranslationKey = 'funnelTooltip',
        data: XYCoordShape[] = FUNNEL_SHAPES
    ) {
        super(container, agChartsExports, tooltipName);

        this.shapes = createShapePaths(agChartsExports, this.root, data, this.size, this.padding);

        this.updateColors(fills, strokes);
    }

    override updateColors(fills: string[], strokes: string[]): void {
        this.shapes.forEach((bar) => {
            bar.fill = fills[0];
            bar.stroke = strokes[0];
            bar.strokeWidth = 0;
        });
    }
}
