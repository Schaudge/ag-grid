import type { UserComponentName } from '../../context/context';
import type { ValidationModuleName } from '../../interfaces/iModule';

export const USER_COMP_MODULES: Record<UserComponentName, ValidationModuleName> = {
    agSetColumnFilter: 'SetFilter',
    agSetColumnFloatingFilter: 'SetFilter',
    agMultiColumnFilter: 'MultiFilter',
    agMultiColumnFloatingFilter: 'MultiFilter',
    agGroupColumnFilter: 'GroupFilter',
    agGroupColumnFloatingFilter: 'GroupFilter',
    agGroupCellRenderer: 'GroupCellRenderer',
    agGroupRowRenderer: 'GroupCellRenderer',
    agRichSelect: 'RichSelect',
    agRichSelectCellEditor: 'RichSelect',
    agDetailCellRenderer: 'SharedMasterDetail',
    agSparklineCellRenderer: 'Sparklines',
    agDragAndDropImage: 'SharedDragAndDrop',
    agColumnHeader: 'ColumnHeaderComp',
    agColumnGroupHeader: 'ColumnGroupHeaderComp',
    agSortIndicator: 'Sort',
    agAnimateShowChangeCellRenderer: 'HighlightChanges',
    agAnimateSlideCellRenderer: 'HighlightChanges',
    agLoadingCellRenderer: 'LoadingCellRenderer',
    agSkeletonCellRenderer: 'SkeletonCellRenderer',
    agCheckboxCellRenderer: 'CheckboxCellRenderer',
    agLoadingOverlay: 'Overlay',
    agNoRowsOverlay: 'Overlay',
    agTooltipComponent: 'Tooltip',
    agReadOnlyFloatingFilter: 'CustomFilter',
    agTextColumnFilter: 'TextFilter',
    agNumberColumnFilter: 'NumberFilter',
    agDateColumnFilter: 'DateFilter',
    agDateInput: 'DateFilter',
    agTextColumnFloatingFilter: 'TextFilter',
    agNumberColumnFloatingFilter: 'NumberFilter',
    agDateColumnFloatingFilter: 'DateFilter',
    agCellEditor: 'TextEditor',
    agSelectCellEditor: 'SelectEditor',
    agTextCellEditor: 'TextEditor',
    agNumberCellEditor: 'NumberEditor',
    agDateCellEditor: 'DateEditor',
    agDateStringCellEditor: 'DateEditor',
    agCheckboxCellEditor: 'CheckboxEditor',
    agLargeTextCellEditor: 'LargeTextEditor',
    agMenuItem: 'MenuItem',
    agColumnsToolPanel: 'ColumnsToolPanel',
    agFiltersToolPanel: 'FiltersToolPanel',
    agAggregationComponent: 'StatusBar',
    agSelectedRowCountComponent: 'StatusBar',
    agTotalRowCountComponent: 'StatusBar',
    agFilteredRowCountComponent: 'StatusBar',
    agTotalAndFilteredRowCountComponent: 'StatusBar',
    agFindCellRenderer: 'Find',
};
