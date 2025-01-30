import type { ChartType } from 'ag-grid-community';

import type { AgChartsExports } from '../../../../../agChartsExports';
import type { ChartTranslationKey } from '../../../../services/chartTranslationService';
import type { ThemeTemplateParameters } from '../../miniChartsContainer';
import type { XYCoordShape } from '../miniChartApi';
import { MiniFunnel } from './miniFunnel';

const PYRAMID_SHAPES: XYCoordShape[] = [
    [
        [8, 16],
        [10, 12],
        [6, 12],
    ],
    [
        [10.5, 11],
        [12.5, 7],
        [3.5, 7],
        [5.5, 11],
    ],
    [
        [13, 6],
        [15.5, 1.5],
        [0.5, 1.5],
        [3, 6],
    ],
];

export class MiniPyramid extends MiniFunnel {
    static override chartType: ChartType = 'pyramid';

    constructor(
        container: HTMLElement,
        agChartsExports: AgChartsExports,
        fills: string[],
        strokes: string[],
        _themeTemplateParameters: ThemeTemplateParameters,
        _isCustomTheme: boolean,
        tooltipName: ChartTranslationKey = 'pyramidTooltip'
    ) {
        super(
            container,
            agChartsExports,
            fills,
            strokes,
            _themeTemplateParameters,
            _isCustomTheme,
            tooltipName,
            PYRAMID_SHAPES
        );
    }

    override updateColors(fills: string[], strokes: string[]): void {
        this.shapes.forEach((bar, i) => {
            bar.fill = fills[i];
            bar.stroke = strokes[i];
            bar.strokeWidth = 0;
        });
    }
}
