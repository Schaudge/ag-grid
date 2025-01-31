import type { NamedBean } from '../../context/bean';
import { BeanStub } from '../../context/beanStub';
import type { AgColumn } from '../../entities/agColumn';
import type { RowNode } from '../../entities/rowNode';
import type { CellPosition } from '../../interfaces/iCellPosition';
import { _debounce } from '../../utils/function';
import type { CellSpan } from './rowSpanCache';
import { RowSpanCache } from './rowSpanCache';
import { _normalisePinnedValue } from './spannedRowRenderer';

export class RowSpanService extends BeanStub<'spannedCellsUpdated'> implements NamedBean {
    beanName = 'rowSpanSvc' as const;

    private spanningColumns: Map<AgColumn, RowSpanCache> = new Map();

    public postConstruct(): void {
        this.addManagedEventListeners({
            modelUpdated: this.buildModelCaches.bind(this),
            pinnedRowDataChanged: this.buildPinnedCaches.bind(this),
        });
    }

    /**
     * When a new column is created with spanning (or spanning changes for a column)
     * @param column column that is now spanning
     */
    public register(column: AgColumn): void {
        const { gos } = this.beans;
        if (!gos.get('enableCellSpan')) {
            return;
        }
        if (this.spanningColumns.has(column)) {
            return;
        }
        const cache = this.createManagedBean(new RowSpanCache(column));
        this.spanningColumns.set(column, cache);

        // make sure if row model already run we prep this cache
        cache.buildCache('top');
        cache.buildCache('bottom');
        cache.buildCache('center');
        this.debouncePinnedEvent();
        this.debounceModelEvent();
    }

    // debounced to allow spannedRowRenderer to run first, removing any old spanned rows
    private debouncePinnedEvent = _debounce(this, this.dispatchCellsUpdatedEvent.bind(this, true), 0);
    private debounceModelEvent = _debounce(this, this.dispatchCellsUpdatedEvent.bind(this, false), 0);
    private dispatchCellsUpdatedEvent(pinned: boolean): void {
        this.dispatchLocalEvent({ type: 'spannedCellsUpdated', pinned });
    }

    /**
     * When a new column is destroyed with spanning (or spanning changes for a column)
     * @param column column that is now spanning
     */
    public deregister(column: AgColumn): void {
        this.spanningColumns.delete(column);
    }

    private buildModelCaches(): void {
        this.spanningColumns.forEach((cache) => cache.buildCache('center'));
        this.debounceModelEvent();
    }

    private buildPinnedCaches(): void {
        this.spanningColumns.forEach((cache) => {
            cache.buildCache('top');
            cache.buildCache('bottom');
        });
        this.debouncePinnedEvent();
    }

    public isCellSpanning(col: AgColumn, rowNode: RowNode): boolean {
        const cache = this.spanningColumns.get(col);
        if (!cache) {
            return false;
        }

        return cache.isCellSpanning(rowNode);
    }

    public getCellSpanByPosition(position: CellPosition): CellSpan | undefined {
        const col = position.column;
        const index = position.rowIndex;

        const cache = this.spanningColumns.get(col as AgColumn);
        if (!cache) {
            return undefined;
        }

        return cache.getSpanByRowIndex(index, _normalisePinnedValue(position.rowPinned));
    }

    public getCellStart(position: CellPosition): CellPosition | undefined {
        const span = this.getCellSpanByPosition(position);
        if (!span) {
            return position;
        }

        return { ...position, rowIndex: span.firstNode.rowIndex! };
    }

    public getCellEnd(position: CellPosition): CellPosition | undefined {
        const span = this.getCellSpanByPosition(position);
        if (!span) {
            return position;
        }

        return { ...position, rowIndex: span.getLastNode().rowIndex! };
    }

    /**
     * Look-up a spanned cell given a col and node as position indicators
     *
     * @param col a column to lookup a span at this position
     * @param rowNode a node that may be spanned at this position
     * @returns the CellSpan object if one exists
     */
    public getCellSpan(col: AgColumn, rowNode: RowNode) {
        const cache = this.spanningColumns.get(col);
        if (!cache) {
            return undefined;
        }

        return cache.getCellSpan(rowNode);
    }

    public forEachSpannedColumn(rowNode: RowNode, callback: (col: AgColumn, span: CellSpan) => void): void {
        for (const [col, cache] of this.spanningColumns) {
            if (cache.isCellSpanning(rowNode)) {
                const spanningNode = cache.getCellSpan(rowNode)!;
                callback(col, spanningNode);
            }
        }
    }

    public override destroy(): void {
        super.destroy();
        this.spanningColumns.clear();
    }
}
