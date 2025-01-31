import type { BeanCollection } from '../../context/context';
import { RowComp } from '../../rendering/row/rowComp';
import type { RowCtrl, RowCtrlInstanceId } from '../../rendering/row/rowCtrl';
import { _ensureDomOrder } from '../../utils/dom';
import type { ComponentSelector } from '../../widgets/component';
import { Component, RefPlaceholder } from '../../widgets/component';
import type { IRowContainerComp, RowContainerName, RowContainerOptions } from './rowContainerCtrl';
import {
    RowContainerCtrl,
    _getRowContainerClass,
    _getRowContainerOptions,
    _getRowSpanContainerClass,
    _getRowViewportClass,
} from './rowContainerCtrl';

function templateFactory(name: RowContainerName, options: RowContainerOptions, beans: BeanCollection): string {
    const isCellSpanning = !!beans.gos.get('enableCellSpan') && !!options.getSpannedRowCtrls;

    const containerClass = _getRowContainerClass(name);
    const eContainerTemplate = `<div class="${containerClass}" data-ref="eContainer" role="rowgroup"></div>`;
    if (options.type === 'center' || isCellSpanning) {
        const spannedCellsContainerClass = _getRowSpanContainerClass(name);
        const viewportClass = _getRowViewportClass(name);
        const eSpannedContainerTemplate = `<div class="ag-spanning-container ${spannedCellsContainerClass}" data-ref="eSpannedContainer" role="rowgroup"></div>`;
        return `<div class="ag-viewport ${viewportClass}" data-ref="eViewport" role="presentation">
                ${eContainerTemplate}
                ${isCellSpanning ? eSpannedContainerTemplate : ''}
            </div>`;
    }
    return eContainerTemplate;
}

export class RowContainerComp extends Component {
    private readonly eViewport: HTMLElement = RefPlaceholder;
    private readonly eContainer: HTMLElement = RefPlaceholder;
    private readonly eSpannedContainer: HTMLElement = RefPlaceholder;

    private readonly name: RowContainerName;
    private readonly options: RowContainerOptions;

    private rowCompsNoSpan: { [id: RowCtrlInstanceId]: RowComp } = {};
    private rowCompsWithSpan: { [id: RowCtrlInstanceId]: RowComp } = {};

    // we ensure the rows are in the dom in the order in which they appear on screen when the
    // user requests this via gridOptions.ensureDomOrder. this is typically used for screen readers.
    private domOrder: boolean;
    private lastPlacedElement: HTMLElement | null;

    constructor(params?: { name: string }) {
        super();
        this.name = params?.name as RowContainerName;
        this.options = _getRowContainerOptions(this.name);
    }

    public postConstruct(): void {
        this.setTemplate(templateFactory(this.name, this.options, this.beans));

        const compProxy: IRowContainerComp = {
            setHorizontalScroll: (offset: number) => (this.eViewport.scrollLeft = offset),
            setViewportHeight: (height) => (this.eViewport.style.height = height),
            setRowCtrls: ({ rowCtrls }) => this.setRowCtrls(rowCtrls),
            setSpannedRowCtrls: (rowCtrls: RowCtrl[]) => this.setRowCtrls(rowCtrls, true),
            setDomOrder: (domOrder) => {
                this.domOrder = domOrder;
            },
            setContainerWidth: (width) => {
                this.eContainer.style.width = width;
                if (this.eSpannedContainer) {
                    this.eSpannedContainer.style.width = width;
                }
            },
            setOffsetTop: (offset) => {
                const top = `translateY(${offset})`;
                this.eContainer.style.transform = top;
                if (this.eSpannedContainer) {
                    this.eSpannedContainer.style.transform = top;
                }
            },
        };

        const ctrl = this.createManagedBean(new RowContainerCtrl(this.name));
        ctrl.setComp(compProxy, this.eContainer, this.eViewport);
    }

    public override destroy(): void {
        // destroys all row comps
        this.setRowCtrls([]);
        this.setRowCtrls([], true);
        super.destroy();
        this.lastPlacedElement = null;
    }

    private setRowCtrls(rowCtrls: RowCtrl[], spanContainer?: boolean): void {
        const { beans, options } = this;

        const container = spanContainer ? this.eSpannedContainer : this.eContainer;
        const oldRows = spanContainer ? { ...this.rowCompsWithSpan } : { ...this.rowCompsNoSpan };
        const newComps: { [id: RowCtrlInstanceId]: RowComp } = {};

        if (spanContainer) {
            this.rowCompsWithSpan = newComps;
        } else {
            this.rowCompsNoSpan = newComps;
        }

        this.lastPlacedElement = null;

        const orderedRows: [rowComp: RowComp, isNew: boolean][] = [];

        for (const rowCtrl of rowCtrls) {
            const instanceId = rowCtrl.instanceId;
            const existingRowComp = oldRows[instanceId];

            let rowComp: RowComp;

            if (existingRowComp) {
                rowComp = existingRowComp;
                delete oldRows[instanceId];
            } else {
                if (!rowCtrl.rowNode.displayed) {
                    continue;
                }
                rowComp = new RowComp(rowCtrl, beans, options.type);
            }
            newComps[instanceId] = rowComp;
            orderedRows.push([rowComp, !existingRowComp]);
        }

        this.removeOldRows(Object.values(oldRows), container);
        this.addRowNodes(orderedRows, container);
    }

    private addRowNodes(rows: [rowComp: RowComp, isNew: boolean][], container: HTMLElement): void {
        const { domOrder } = this;
        for (const [rowComp, isNew] of rows) {
            const eGui = rowComp.getGui();
            if (!domOrder) {
                if (isNew) {
                    container.appendChild(eGui);
                }
            } else {
                this.ensureDomOrder(eGui);
            }
        }
    }

    private removeOldRows(rowComps: RowComp[], container: HTMLElement): void {
        for (const oldRowComp of rowComps) {
            container.removeChild(oldRowComp.getGui());
            oldRowComp.destroy();
        }
    }

    private ensureDomOrder(eRow: HTMLElement): void {
        _ensureDomOrder(this.eContainer, eRow, this.lastPlacedElement);
        this.lastPlacedElement = eRow;
    }
}

export const RowContainerSelector: ComponentSelector = {
    selector: 'AG-ROW-CONTAINER',
    component: RowContainerComp,
};
