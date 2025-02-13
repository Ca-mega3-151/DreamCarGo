import { Table as AntTable, TableProps as AntTableProps } from 'antd';
import classNames from 'classnames';
import { keys, sum, values } from 'ramda';
import { Dispatch, Key, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDeepCompareEffect, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { Badge } from '../../Badge';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { Drawer } from '../../Drawer';
import { Input } from '../../Input';
import { Modal } from '../../Modal';
import { Popover } from '../../Popover';
import { Cog } from './components/icons/Cog';
import { Eye } from './components/icons/Eye';
import { EyeSlash } from './components/icons/EyeSlash';
import { Filter } from './components/icons/Filter';
import { Refresh } from './components/icons/Refresh';
import { XClose } from './components/icons/XClose';
import { SortableList } from './components/SortableList/SortableList';
import { StickyAction } from './components/StickyAction/StickyAction';
import { defaultCheckMode } from './constants/defaultCheckMode';
import { defaultCurrentPage } from './constants/defaultCurrentPage';
import { defaultDataSource } from './constants/defaultDataSource';
import { defaultFilterValues } from './constants/defaultFilterValues';
import { defaultPageSize } from './constants/defaultPageSize';
import { defaultPaginationMode } from './constants/defaultPaginationMode';
import { defaultPluralNSingular } from './constants/defaultPluralNSingular';
import { defaultSelectedRecordsState } from './constants/defaultSelectedRecordsState';
import { defaultShowSizeChanger } from './constants/defaultShowSizeChanger';
import { defaultSize } from './constants/defaultSize';
import { defaultSizeChangerOptions } from './constants/defaultSizeChangerOptions';
import { defaultTableLayout } from './constants/defaultTableLayout';
import { defaultTotalRecords } from './constants/defaultTotalRecords';
import { DrawerWidth } from './constants/DrawerWidth';
import './css/actions.css';
import './css/columnsConfig.css';
import './css/drawFilter.css';
import './css/selected.css';
import './css/table.css';
import { useAntTableColumnsState } from './hooks/useAntTableColumnsState';
import { useAntTableIndexColumn } from './hooks/useAntTableIndexColumn';
import { useAvailableColumnsState } from './hooks/useAvailableColumnsState';
import { AntColumnProp } from './types/AntColumnProp';
import { ColumnsState } from './types/ColumnsState';
import { ColumnType } from './types/ColumnType';
import { FilterValues } from './types/Filter';
import { FilterState } from './types/FilterState';
import { PaginationMode } from './types/PaginationMode';
import { SortValues } from './types/Sorter';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { pluralize, toArray } from '~/shared/Utilities';

export interface Props<
  RecordType extends AnyRecord,
  ActionKey extends string = string,
  ExtraFilterValues extends AnyRecord = {},
> extends Pick<
    AntTableProps<RecordType>,
    'className' | 'dataSource' | 'expandable' | 'direction' | 'indentSize' | 'loading' | 'size' | 'tableLayout'
  > {
  /** Locale settings for UI labels and text. */
  locale?: {
    /** Text for the reset button in column configuration. */
    reset?: string;
    /** Text for the apply button in column configuration. */
    apply?: string;
    /** Text for selecting all items. */
    select_all?: string;
    /** Function to display the current selection state. */
    show_current_state?: (params: { selected: number; total: number }) => ReactNode;
    /** Title for advanced column configuration. */
    columns_advance_config_title?: string;
    /** Label for column configuration menu. */
    columns_config?: string;
    /** Label for refresh action. */
    refresh?: string;
    /** Label for filter action. */
    filter?: string;
    /** Placeholder text for search input. */
    search?: string;
  };

  /** Defines table columns. */
  columns?: ColumnType<RecordType, ActionKey>[];

  /** Offset for the sticky header (in pixels). */
  offsetHeader?: number;

  /** Fixed height for scrollable tables (in pixels). */
  tableHeight?: number;

  /** Whether to auto-generate a row index column. Defaults to `false`. */
  autoIndex?: boolean;

  /** Function to generate a unique key for each row. */
  recordKey?: (record: RecordType) => Key;

  /** Pagination configuration. */
  pagination: {
    /** Total number of records. */
    totalRecords?: number;
    /** Current page number. */
    currentPage?: number;
    /** Number of items per page. */
    pageSize: number;
    /** Options for page size dropdown. */
    sizeChangerOptions?: number[];
    /** Callback when page or pageSize changes. */
    onPaginationChange?: (params: { page: number; pageSize: number }) => void;
    /** Function to generate a pluralized label for total count. */
    plural?: (params: { from: number; to: number }) => string;
    /** Function to generate a singular label for total count. */
    singular?: (params: { from: number; to: number }) => string;
    /** Pagination display mode. Defaults to `'sticky'`. */
    paginationMode?: PaginationMode;
    /** Disables pagination when `true`. */
    nonePagination?: boolean;
    /** Displays a size changer dropdown when `true`. */
    showSizeChanger?: boolean;
    /** Custom CSS class for pagination. */
    paginationClassName?: string;
  };

  /** Sorting configuration. */
  sorter?: {
    /** Current sorting state. */
    sortValues?: SortValues<ActionKey>;
    /** Callback when sorting changes. */
    onSortChange?: (sortValues: SortValues<ActionKey>) => void;
  };

  /** Filtering configuration. */
  filter?: {
    OtherFilter?: ReactNode;
    /** Callback when filter values change. */
    onFilterChange?: (filterValues: FilterValues<ActionKey, ExtraFilterValues>) => void;
    /** Current filter state. */
    filterValues?: FilterValues<ActionKey, ExtraFilterValues>;
    /** UI display variant for filters (`'overlay'` or `'aside'`). */
    filterVariant?: 'overlay' | 'aside';
  };

  /** Row selection configuration. */
  select?: {
    /** Function to render a sticky action UI for selected rows. */
    renderStickyAction?: (params: { selectedRecords: RecordType[]; clear: () => void }) => ReactNode;
    /** Selection mode when paginating (`'autoClear'` or `'keepPagination'`). */
    checkMode?: 'autoClear' | 'keepPagination';
    /** Currently selected rows. */
    selectedRecordsState?: RecordType[];
    /** Function to update the selected rows. */
    setSelectedRecordsState?: Dispatch<SetStateAction<RecordType[]>>;
    /** Function to determine if a row is selectable. */
    recordSelectable?: (record: RecordType) => boolean;
  };

  /** Search configuration. */
  search?: {
    /** Current search query. */
    searchValue?: string;
    /** Placeholder text for search input. */
    searchPlaceholder?: string;
    /** Callback when search is performed. */
    onSearch?: (value: string) => void;
  };

  /** Column view settings. */
  configViews?: {
    /** Column state settings. */
    columnsState?: ColumnsState;
    /** Storage key for persisting table state. */
    storageKey?: string;
    /** Callback when column settings change. */
    onChangeConfigViews?: (configViews: ColumnsState) => void;
  };

  /** Callback when the table is refreshed. */
  onRefresh?: () => void;

  /** Callback when a new record is created. */
  onCreate?: () => void;

  /** Custom function for rendering UI actions like Refresh, Filter, and Columns. */
  actions?: (params: { Refresh: ReactNode; Filter: ReactNode; Columns: ReactNode }) => ReactNode;
}

/**
 * Table component that extends the Ant Design Table with enhanced type safety and additional features.
 *
 * This component provides advanced functionalities such as sorting, filtering, pagination, row selection,
 * and column configuration. It is designed to be highly customizable while maintaining ease of use.
 *
 * @template RecordType - The type representing each data record.
 * @template ActionKey - The type representing column action keys (defaults to `string`).
 * @template ExtraFilterValues - FIXME:
 *
 * @param {Props<RecordType, ActionKey>} props - The properties required to configure the table.
 * @param {string} [props.className] - Custom CSS class for styling the table.
 * @param {RecordType[]} [props.dataSource] - Data source array for table rows.
 * @param {Object} [props.expandable] - Configuration for expandable rows.
 * @param {'ltr' | 'rtl'} [props.direction] - Table layout direction (`'ltr'` or `'rtl'`).
 * @param {number} [props.indentSize] - Size of the indent for hierarchical tree data.
 * @param {boolean} [props.loading] - Whether the table is in a loading state.
 * @param {Key | ((record: RecordType) => Key)} [props.recordKey] - Unique key for each row.
 * @param {'small' | 'middle' | 'large'} [props.size] - The table size (`'small'`, `'middle'`, or `'large'`).
 * @param {'auto' | 'fixed'} [props.tableLayout] - The `table-layout` CSS property (`'auto'` or `'fixed'`).
 *
 * @param {Object} [props.locale] - Locale settings for UI labels and text.
 * @param {string} [props.locale.reset] - Text for the reset button in column configuration.
 * @param {string} [props.locale.apply] - Text for the apply button in column configuration.
 * @param {string} [props.locale.select_all] - Text for selecting all items.
 * @param {Function} [props.locale.show_current_state] - Function to display selection state.
 *
 * @param {Object} props.pagination - Pagination configuration.
 * @param {number} [props.pagination.totalRecords] - Total number of records.
 * @param {number} [props.pagination.currentPage] - Current page number.
 * @param {number} props.pagination.pageSize - Number of items per page.
 * @param {number[]} [props.pagination.sizeChangerOptions] - Options for changing page size.
 * @param {Function} [props.pagination.onPaginationChange] - Callback triggered when page changes.
 * @param {Function} [props.pagination.plural] - Function to generate a pluralized total count label.
 * @param {Function} [props.pagination.singular] - Function to generate a singular total count label.
 * @param {'sticky' | 'none'} [props.pagination.paginationMode] - Pagination display mode.
 * @param {boolean} [props.pagination.nonePagination] - Whether to disable pagination.
 * @param {boolean} [props.pagination.showSizeChanger] - Whether to show a size changer dropdown.
 * @param {string} [props.pagination.paginationClassName] - Custom CSS class for pagination controls.
 *
 * @param {Object} [props.sorter] - Sorting configuration.
 * @param {SortValues<ActionKey>} [props.sorter.sortValues] - Current sorting state.
 * @param {Function} [props.sorter.onSortChange] - Callback triggered when sorting changes.
 *
 * @param {Object} [props.filter] - Filtering configuration.
 * @param {Function} [props.filter.onFilterChange] - Callback triggered when filter values change.
 * @param {FilterValues<ActionKey, ExtraFilterValues>} [props.filter.filterValues] - Current filter state.
 * @param {'overlay' | 'aside'} [props.filter.filterVariant] - UI display style for filters.
 *
 * @param {Object} [props.select] - Row selection configuration.
 * @param {Function} [props.select.renderStickyAction] - Function to render a sticky UI for selected rows.
 * @param {'autoClear' | 'keepPagination'} [props.select.checkMode] - Row selection mode when paginating.
 * @param {RecordType[]} [props.select.selectedRecordsState] - Currently selected rows.
 * @param {Function} [props.select.setSelectedRecordsState] - Function to update selected rows.
 * @param {Function} [props.select.recordSelectable] - Function to determine row selectability.
 *
 * @param {Object} [props.search] - Search configuration.
 * @param {string} [props.search.searchValue] - Current search query.
 * @param {string} [props.search.searchPlaceholder] - Placeholder text for search input.
 * @param {Function} [props.search.onSearch] - Callback triggered when search is performed.
 *
 * @param {Object} [props.configViews] - Column configuration settings.
 * @param {ColumnsState} [props.configViews.columnsState] - Column state settings.
 * @param {string} [props.configViews.storageKey] - Storage key for persisting table state.
 * @param {Function} [props.configViews.onChangeConfigViews] - Callback triggered when column settings change.
 *
 * @param {Function} [props.onRefresh] - Callback triggered when the table is refreshed.
 * @param {Function} [props.onCreate] - Callback triggered when a new record is created.
 * @param {Function} [props.actions] - Custom function for rendering action elements (`Refresh`, `Filter`, `Columns`).
 *
 * @returns {ReactNode} The rendered Table component.
 */
export const Table = <RecordType extends AnyRecord, ActionKey extends string, ExtraFilterValues extends AnyRecord>(
  props: Props<RecordType, ActionKey, ExtraFilterValues>,
): ReactNode => {
  const {
    pagination: {
      totalRecords = defaultTotalRecords,
      currentPage = defaultCurrentPage,
      pageSize = defaultPageSize,
      sizeChangerOptions = defaultSizeChangerOptions,
      onPaginationChange,
      paginationMode = defaultPaginationMode,
      nonePagination,
      showSizeChanger = defaultShowSizeChanger,
      paginationClassName,
      plural = defaultPluralNSingular,
      singular = defaultPluralNSingular,
    } = {},

    className,
    dataSource = defaultDataSource,
    expandable,
    direction,
    indentSize,
    loading,
    recordKey,
    size = defaultSize,
    tableLayout = defaultTableLayout,
    tableHeight,
    offsetHeader,

    select: {
      selectedRecordsState = defaultSelectedRecordsState,
      setSelectedRecordsState,
      checkMode = defaultCheckMode,
      renderStickyAction,
    } = {},

    sorter: { sortValues, onSortChange } = {},

    filter: { filterValues = defaultFilterValues, onFilterChange, filterVariant = 'overlay', OtherFilter } = {},

    search: { searchValue, searchPlaceholder, onSearch } = {},

    configViews: { storageKey, ...configViews } = {},

    locale,
    onRefresh,
    actions,
  } = props;

  const from = Math.max((currentPage - 1) * pageSize, 0) + 1;
  const to = Math.min(currentPage * pageSize, totalRecords);
  const columnsConfigText = locale?.columns_config ?? 'Columns';
  const refreshText = locale?.refresh ?? 'Refresh';
  const filterText = locale?.filter ?? 'Filter';
  const applyText = locale?.apply ?? 'Apply';
  const resetText = locale?.reset ?? 'Reset';
  const searchText = locale?.search ?? 'Search';

  useInitializeContext();
  const isMounted = useIsMounted();

  const { availableColumns, defaultVisibleOfColumns } = useAvailableColumnsState(props);
  const antIndexColumnState = useAntTableIndexColumn(props);

  //#region Handle columns
  const [filterState, setFilterState] = useState<FilterState<ActionKey, ExtraFilterValues>>({
    columnKey: undefined,
    values: undefined,
    openDrawer: false,
  });
  const antTableColumnsState = useAntTableColumnsState({
    applyTextButton: applyText,
    resetTextButton: resetText,
    availableColumns: availableColumns,
    filterState,
    setFilterState,
    filterValues,
    onFilterChange,
    recordKey,
    selectedRecordsState,
    sortValues,
  });
  //#endregion

  //#region Columns config indexes & visible
  const [columnsStateValues, setColumnsStateValues_] = useState<ColumnsState>(() => {
    if (configViews.columnsState) {
      return configViews.columnsState;
    }
    if (storageKey) {
      const inStorage = localStorage.getItem(storageKey);
      if (inStorage) {
        const parsedValue = JSON.parse(inStorage);
        return parsedValue;
      } else {
        localStorage.setItem(storageKey, JSON.stringify(defaultVisibleOfColumns));
        return defaultVisibleOfColumns;
      }
    }
    return defaultVisibleOfColumns;
  });
  const setColumnsStateValues = (nextState: ColumnsState): void => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(nextState));
    }
    return setColumnsStateValues_(nextState);
  };
  const [advanceConfigColumns, setAdvanceConfigColumns] = useState<{
    isOpen: boolean;
    columnsStateValues: ColumnsState | undefined;
  }>({ isOpen: false, columnsStateValues: undefined });
  const handleOpenModalAdvanceConfigColumns = () => {
    setAdvanceConfigColumns({
      isOpen: true,
      columnsStateValues,
    });
  };
  const handleCloseModalAdvanceConfigColumns = () => {
    setAdvanceConfigColumns({
      isOpen: false,
      columnsStateValues: undefined,
    });
  };
  const handleApplyAdvanceConfigColumns = () => {
    if (advanceConfigColumns.columnsStateValues) {
      setColumnsStateValues(advanceConfigColumns.columnsStateValues);
    }
    handleCloseModalAdvanceConfigColumns();
  };

  useDeepCompareEffect(() => {
    if (isMounted && configViews.columnsState) {
      setColumnsStateValues(configViews.columnsState);
    }
  }, [configViews.columnsState]);

  const antTableColumnsStateConfigured = useMemo(() => {
    let width = 0;
    const columns = columnsStateValues.reduce<AntColumnProp>((result, { id: columnId, visible }) => {
      const columnItem = antTableColumnsState.columns[columnId];
      if (!visible || !columnItem) {
        return result;
      }
      width += columnItem.width;
      return result.concat(columnItem);
    }, []);
    return { columns, width };
  }, [columnsStateValues, antTableColumnsState.columns]);

  const handleToggleColumnVisible = ({ id, visible }: ColumnsState[number]): void => {
    const nextState = columnsStateValues.map(itemState => {
      if (itemState.id === id) {
        return {
          ...itemState,
          visible: visible,
        };
      }
      return itemState;
    });
    setColumnsStateValues(nextState);
  };

  const renderColumnsConfig = (): ReactNode => {
    return (
      <div className="AntTableColumnsConfig__settingsViewContent">
        <div className="AntTableColumnsConfig__settingsViewContentHeader">
          <div>{columnsConfigText}</div>
        </div>
        <div className="AntTableColumnsConfig__listColumns">
          <SortableList
            items={columnsStateValues}
            onChange={setColumnsStateValues}
            renderItem={item => {
              const rawColumnData = antTableColumnsState.columns[item.id];
              if (!rawColumnData) {
                return null;
              }
              return (
                <SortableList.Item id={item.id}>
                  <div
                    className={classNames(
                      'AntTableColumnsConfig__columnItem',
                      !item.visible ? 'AntTableColumnsConfig__columnItem--invisible' : '',
                    )}
                  >
                    <div className="AntTableColumnsConfig__columnInfo">
                      <SortableList.DragHandle />
                      <div className="AntTableColumnsConfig__columnName">{rawColumnData.title}</div>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      onClick={() => {
                        return handleToggleColumnVisible({ id: item.id, visible: !item.visible });
                      }}
                    >
                      {item.visible ? <Eye /> : <EyeSlash />}
                    </Button>
                  </div>
                </SortableList.Item>
              );
            }}
          />
        </div>
      </div>
    );
  };
  //#endregion

  //#region Drawer
  const isReadyToCallOnFilterChange = useRef(false);
  const isOpenDrawer = useMemo(() => {
    return filterState.openDrawer;
  }, [filterState.openDrawer]);

  const handleCloseDrawer = (): void => {
    setFilterState(state => {
      return {
        ...state,
        values: undefined,
        openDrawer: false,
      };
    });
  };

  const DrawerFooter = useMemo(() => {
    if (filterVariant === 'overlay') {
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            disabled={!!loading}
            color="error"
            ghost
            onClick={() => {
              onFilterChange?.(
                keys(filterValues ?? {}).reduce<FilterValues<ActionKey, ExtraFilterValues>>(
                  (result, item) => {
                    return {
                      ...result,
                      [item]: undefined,
                    };
                  },
                  {} as FilterValues<ActionKey, ExtraFilterValues>,
                ),
              );
              setFilterState(state => {
                return {
                  ...state,
                  values: undefined,
                  openDrawer: false,
                };
              });
            }}
          >
            {resetText}
          </Button>
          <Button
            loading={!!loading}
            color="primary"
            onClick={() => {
              if (filterState.values) {
                onFilterChange?.(filterState.values);
                setFilterState(state => {
                  return {
                    ...state,
                    values: undefined,
                    openDrawer: false,
                  };
                });
              }
            }}
          >
            {applyText}
          </Button>
        </div>
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyText, filterState.values, filterValues, filterVariant, loading, resetText]);

  useDeepCompareEffect(() => {
    // When drawer open ==> "onFilterChange" should be called when filter values state change
    if (
      isMounted &&
      filterVariant === 'aside' &&
      isOpenDrawer &&
      filterState.values &&
      isReadyToCallOnFilterChange.current
    ) {
      onFilterChange?.(filterState.values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState.values]);
  //#endregion

  useEffect(() => {
    if (isMounted && checkMode === 'autoClear') {
      setSelectedRecordsState?.([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <AntTable
        bordered
        tableLayout={tableLayout}
        title={() => {
          const ActionColumns = (
            <Popover
              overlayClassName="AntTableColumnsConfig__popover"
              placement="bottom"
              content={renderColumnsConfig()}
              trigger={['hover']}
            >
              <div>
                <Button
                  block
                  size={size}
                  children={columnsConfigText}
                  icon={
                    <div className="AntTable__actionsIcon">
                      <Cog />
                    </div>
                  }
                  onClick={handleOpenModalAdvanceConfigColumns}
                />
              </div>
            </Popover>
          );
          const ActionRefresh = (
            <Button
              block
              disabled={!!loading}
              size={size}
              onClick={onRefresh}
              children={refreshText}
              icon={
                <div className="AntTable__actionsIcon">
                  <Refresh />
                </div>
              }
            />
          );
          const ActionFilter = (
            <Badge
              color="primary"
              className="AntTable__Filter"
              content={
                values(filterValues).filter(item => {
                  return item !== undefined && item !== null;
                }).length
              }
            >
              <Button
                block
                disabled={!!loading}
                size={size}
                children={filterText}
                onClick={() => {
                  return setFilterState(state => {
                    return {
                      ...state,
                      values: filterValues,
                      openDrawer: true,
                    };
                  });
                }}
                icon={
                  <div className="AntTable__actionsIcon">
                    <Filter />
                  </div>
                }
              />
            </Badge>
          );
          let Actions: ReactNode;
          if (actions) {
            Actions = actions({ Columns: ActionColumns, Filter: ActionFilter, Refresh: ActionRefresh });
          }
          Actions = (
            <>
              {ActionColumns}
              {ActionRefresh}
              {ActionFilter}
            </>
          );
          return (
            <div className="AntTable__titleContainer">
              <div className="AntTable__searchInput">
                <Input
                  placeholder={searchPlaceholder ?? searchText}
                  size={size}
                  value={searchValue}
                  onDebounceChange={value => {
                    return onSearch?.(value ?? '');
                  }}
                />
              </div>
              <div className="AntTable__actions">{Actions}</div>
            </div>
          );
        }}
        sticky={offsetHeader === undefined ? undefined : { offsetHeader }}
        size={size}
        rowKey={recordKey}
        loading={loading}
        indentSize={indentSize}
        direction={direction}
        dataSource={dataSource}
        expandable={expandable}
        columns={[...antIndexColumnState.antTableIndexColumn, ...antTableColumnsStateConfigured.columns]}
        className={classNames(
          'AntTable__container',
          paginationMode === 'sticky' ? 'AntTable--paginationSticky' : 'AntTable--paginationNone',
          className,
        )}
        style={{ width: filterVariant === 'aside' && isOpenDrawer ? `calc(100% - ${DrawerWidth}px)` : '' }}
        scroll={{
          x: sum([antIndexColumnState.antTableIndexColumnWidth, antTableColumnsStateConfigured.width]),
          y: tableHeight,
          scrollToFirstRowOnChange: true,
        }}
        onChange={(_pagination, _filter, sorter, extra) => {
          if (extra.action === 'sort') {
            const nextSortValues = toArray(sorter).reduce<SortValues<ActionKey>>((result, item) => {
              if (typeof item.columnKey === 'string') {
                return {
                  ...result,
                  [item.columnKey as ActionKey]: {
                    order: item.order,
                    priority:
                      typeof item.column?.sorter === 'object' && 'multiple' in item.column.sorter
                        ? item.column?.sorter.multiple ?? 0
                        : 0,
                  },
                };
              }
              return result;
            }, {} as SortValues<ActionKey>);
            onSortChange?.(nextSortValues);
          }
        }}
        pagination={
          nonePagination
            ? false
            : {
                simple: false,
                showLessItems: true,
                hideOnSinglePage: false,
                className: classNames('AntTable__pagination', paginationClassName),
                showSizeChanger,
                total: totalRecords,
                current: currentPage,
                pageSizeOptions: sizeChangerOptions,
                pageSize,
                onChange: (page, pageSize) => {
                  return onPaginationChange?.({ page, pageSize });
                },
                showTotal: (total): ReactNode => {
                  if (!total) {
                    return null;
                  }
                  return (
                    <Highlighter
                      highlightClassName="AntTable__text-range--highlight"
                      searchWords={[/\d+/g]}
                      textToHighlight={pluralize({
                        count: totalRecords,
                        singular: singular({ from, to }),
                        plural: plural({ from, to }),
                      })}
                    />
                  );
                },
              }
        }
      />
      {renderStickyAction && (
        <StickyAction isVisible={!!selectedRecordsState?.length}>
          {renderStickyAction({
            selectedRecords: selectedRecordsState ?? [],
            clear: () => {
              return setSelectedRecordsState?.([]);
            },
          })}
        </StickyAction>
      )}
      <Drawer
        afterOpenChange={open => {
          isReadyToCallOnFilterChange.current = open;
        }}
        mask={filterVariant === 'overlay'}
        width={DrawerWidth}
        closeIcon={null}
        open={isOpenDrawer}
        onClose={handleCloseDrawer}
        className="AntFilterDrawer__container"
        title={
          <div className="AntFilterDrawer__titleContainer">
            <div className="AntFilterDrawer__title">{filterText}</div>
            <Button
              size="small"
              type="text"
              className="AntFilterDrawer__closeButton"
              onClick={handleCloseDrawer}
              icon={<XClose />}
            />
          </div>
        }
        footer={DrawerFooter}
      >
        <div className="grid grid-cols-1 gap-3">
          {OtherFilter}
          {antTableColumnsState.filtersContent.map(({ columnTitle, columnId, content }) => {
            return (
              <div key={columnId} className="AntFilterDrawer__fieldContainer">
                <div className="AntFilterDrawer__fieldLabel">{columnTitle}</div>
                <div>{content}</div>
              </div>
            );
          })}
        </div>
      </Drawer>
      <Modal
        open={advanceConfigColumns.isOpen}
        width={800}
        title={locale?.columns_advance_config_title}
        onCancel={handleCloseModalAdvanceConfigColumns}
        onOk={handleApplyAdvanceConfigColumns}
      >
        <div className="AntTableAdvanceConfigColumns__settingsViewContent">
          <div className="AntTableAdvanceConfigColumns__columnsSelectable">
            <div className="AntTableAdvanceConfigColumns__columnsSelectableHeader">
              <Checkbox
                checked={defaultVisibleOfColumns?.length === advanceConfigColumns.columnsStateValues?.length}
                onChange={checked => {
                  setAdvanceConfigColumns(state => {
                    return {
                      ...state,
                      columnsStateValues: (checked ? defaultVisibleOfColumns : []).map(columnState => {
                        return { ...columnState, visible: true };
                      }),
                    };
                  });
                }}
              >
                {locale?.select_all}
              </Checkbox>
            </div>
            <div className="AntTableAdvanceConfigColumns__columnsSelectableContent">
              <div className="AntTableAdvanceConfigColumns__columnsSelectableList">
                {defaultVisibleOfColumns.map(item => {
                  const selected = advanceConfigColumns.columnsStateValues?.find(itemState => {
                    return itemState.id === item.id;
                  });
                  const rawColumnData = antTableColumnsState.columns[item.id];
                  return (
                    <Checkbox
                      key={item.id}
                      checked={!!selected}
                      onChange={checked => {
                        setAdvanceConfigColumns(state => {
                          return {
                            ...state,
                            columnsStateValues: checked
                              ? advanceConfigColumns.columnsStateValues?.concat({ ...item, visible: true })
                              : advanceConfigColumns.columnsStateValues?.filter(itemState => {
                                  return itemState.id !== item.id;
                                }),
                          };
                        });
                      }}
                    >
                      {rawColumnData?.title}
                    </Checkbox>
                  );
                })}
                <div className="AntTableAdvanceConfigColumns__columnsSelectableContentPlaceholder" />
              </div>
            </div>
          </div>
          <div className="AntTableAdvanceConfigColumns__columnsSortable">
            <div className="AntTableAdvanceConfigColumns__columnsSortableHeader">
              {locale?.show_current_state?.({
                selected: advanceConfigColumns.columnsStateValues?.length ?? 0,
                total: advanceConfigColumns.columnsStateValues?.length ?? 0,
              })}
            </div>
            <div className="AntTableAdvanceConfigColumns__columnsSortableContent">
              <SortableList
                items={advanceConfigColumns.columnsStateValues}
                onChange={nextColumns => {
                  setAdvanceConfigColumns(state => {
                    return {
                      ...state,
                      columnsStateValues: nextColumns,
                    };
                  });
                }}
                renderItem={item => {
                  const rawColumnData = antTableColumnsState.columns[item.id];
                  if (!rawColumnData) {
                    return null;
                  }
                  return (
                    <SortableList.Item id={item.id}>
                      <div
                        className={classNames(
                          'AntTableColumnsConfig__columnItem',
                          !item.visible ? 'AntTableColumnsConfig__columnItem--invisible' : '',
                        )}
                      >
                        <div className="AntTableColumnsConfig__columnInfo">
                          <SortableList.DragHandle />
                          <div className="AntTableColumnsConfig__columnName">{rawColumnData.title}</div>
                        </div>
                        <Button
                          type="text"
                          size="small"
                          onClick={() => {
                            return handleToggleColumnVisible({ id: item.id, visible: !item.visible });
                          }}
                        >
                          {item.visible ? <Eye /> : <EyeSlash />}
                        </Button>
                      </div>
                    </SortableList.Item>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
