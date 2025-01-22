import { RowComp } from '../../rendering/row/rowComp';
import type { RowCtrl, RowCtrlInstanceId } from '../../rendering/row/rowCtrl';
import { _setAriaRole } from '../../utils/aria';
import { _ensureDomOrder, _insertWithDomOrder } from '../../utils/dom';
import type { ComponentSelector } from '../../widgets/component';
import { Component, RefPlaceholder } from '../../widgets/component';
import type { IRowContainerComp, RowContainerName, RowContainerOptions } from './rowContainerCtrl';
import { RowContainerCtrl, _getRowContainerOptions } from './rowContainerCtrl';

function templateFactory(options: RowContainerOptions): string {
    let res: string;
    if (options.type === 'center') {
        res =
            /* html */
            `<div class="${options.viewport}" data-ref="eViewport" role="presentation">
                <div class="${options.container}" data-ref="eContainer"></div>
            </div>`;
    } else {
        res = /* html */ `<div class="${options.container}" data-ref="eContainer"></div>`;
    }

    return res;
}

export class RowContainerComp extends Component {
    private readonly eViewport: HTMLElement = RefPlaceholder;
    private readonly eContainer: HTMLElement = RefPlaceholder;

    private readonly name: RowContainerName;
    private readonly options: RowContainerOptions;

    private rowComps: { [id: RowCtrlInstanceId]: RowComp } = {};

    // we ensure the rows are in the dom in the order in which they appear on screen when the
    // user requests this via gridOptions.ensureDomOrder. this is typically used for screen readers.
    private domOrder: boolean;
    private lastPlacedElement: HTMLElement | null;

    constructor(params?: { name: string }) {
        super();
        this.name = params?.name as RowContainerName;
        this.options = _getRowContainerOptions(this.name);
        this.setTemplate(templateFactory(this.options));
    }

    public postConstruct(): void {
        const compProxy: IRowContainerComp = {
            setHorizontalScroll: (offset: number) => (this.eViewport.scrollLeft = offset),
            setViewportHeight: (height) => (this.eViewport.style.height = height),
            setRowCtrls: ({ rowCtrls }) => this.setRowCtrls(rowCtrls),
            setDomOrder: (domOrder) => {
                this.domOrder = domOrder;
            },
            setContainerWidth: (width) => (this.eContainer.style.width = width),
            setOffsetTop: (offset) => (this.eContainer.style.transform = `translateY(${offset})`),
        };

        const ctrl = this.createManagedBean(new RowContainerCtrl(this.name));
        ctrl.setComp(compProxy, this.eContainer, this.eViewport);
    }

    public override destroy(): void {
        // destroys all row comps
        this.setRowCtrls([]);
        super.destroy();
        this.lastPlacedElement = null;
    }

    private setRowCtrls(rowCtrls: RowCtrl[]): void {
        const { rowComps, beans, options, eContainer } = this;
        const oldRows = { ...rowComps };

        this.rowComps = {};
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
            this.rowComps[instanceId] = rowComp;
            orderedRows.push([rowComp, !existingRowComp]);
        }

        for (const oldRowComp of Object.values(oldRows)) {
            eContainer.removeChild(oldRowComp.getGui());
            oldRowComp.destroy();
        }

        for (const [rowComp, isNew] of orderedRows) {
            const eGui = rowComp.getGui();
            if (!this.ensureDomOrder) {
                if (isNew) {
                    eContainer.appendChild(eGui);
                }
            } else {
                this.ensureDomOrder(eGui);
            }
        }

        _setAriaRole(eContainer, 'rowgroup');
    }

    public appendRow(element: HTMLElement) {
        if (this.domOrder) {
            _insertWithDomOrder(this.eContainer, element, this.lastPlacedElement);
        } else {
            this.eContainer.appendChild(element);
        }
        this.lastPlacedElement = element;
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
