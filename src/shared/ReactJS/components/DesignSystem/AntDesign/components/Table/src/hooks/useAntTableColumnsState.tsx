import classNames from 'classnames';
import { Dispatch, Key, ReactNode, SetStateAction, useMemo } from 'react';
import { Button } from '../../../Button';
import { SortIcon } from '../components/SortIcon/SortIcon';
import { AntColumnProp } from '../types/AntColumnProp';
import { AvailableColumnsState } from '../types/AvailableColumnsState';
import { ColumnUID } from '../types/ColumnType';
import { FilterValues } from '../types/Filter';
import { FilterState } from '../types/FilterState';
import { SortValues } from '../types/Sorter';
import { isRecordSelected } from '../utils/isRecordSelected';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface UseAntTableColumnsState<
  RecordType extends AnyRecord,
  ActionKey extends string,
  ExtraFilterValues extends AnyRecord,
> {
  availableColumns: AvailableColumnsState<RecordType, ActionKey>;
  sortValues?: SortValues<ActionKey>;
  onFilterChange?: (filterValues: FilterValues<ActionKey, ExtraFilterValues>) => void;
  filterValues?: FilterValues<ActionKey, ExtraFilterValues>;
  recordKey?: (record: RecordType) => Key;
  selectedRecordsState?: RecordType[];
  filterState: FilterState<ActionKey, ExtraFilterValues>;
  setFilterState: Dispatch<SetStateAction<FilterState<ActionKey, ExtraFilterValues>>>;
  applyTextButton: string;
  resetTextButton: string;
}

export const useAntTableColumnsState = <
  RecordType extends AnyRecord,
  ActionKey extends string,
  ExtraFilterValues extends AnyRecord,
>({
  availableColumns,
  filterState,
  filterValues,
  onFilterChange,
  recordKey,
  selectedRecordsState,
  setFilterState,
  sortValues,
  applyTextButton,
  resetTextButton,
}: UseAntTableColumnsState<RecordType, ActionKey, ExtraFilterValues>): {
  columns: Record<ColumnUID, AntColumnProp[number] | undefined>;
  filtersContent: Array<{ content: ReactNode; columnTitle: ReactNode; columnId: string }>;
} => {
  const antTableColumnsState = useMemo(() => {
    const filtersContent: Array<{ content: ReactNode; columnTitle: ReactNode; columnId: string }> = [];
    const columns = availableColumns.reduce<Record<ColumnUID, AntColumnProp[number] | undefined>>(
      (result, columnState) => {
        const columnRawData = columnState.rawData;
        const columnAction = 'actions' in columnRawData ? columnRawData.actions : undefined;
        const columnActionKey = columnAction?.key;
        const filterValueInState =
          filterState.values && columnActionKey ? filterState.values[columnActionKey] : undefined;
        const filterValue = filterValues && columnActionKey ? filterValues[columnActionKey] : undefined;

        let column: AntColumnProp[number] = {
          ...columnRawData,
          id: columnRawData.uid,
          key: columnActionKey,
          onCell: (record, index) => {
            const isSelected = isRecordSelected({ record, recordKey, selectedRecordsState });
            const onCellData = columnRawData.onCell?.(record, index);
            return {
              ...onCellData,
              className: classNames(onCellData?.className, isSelected ? 'AntCell__selected' : ''),
            };
          },
          render: (_, record, index) => {
            return columnRawData.render(record, index);
          },
        };

        if (columnAction?.sort?.enable) {
          const sortValue = sortValues && columnActionKey ? sortValues[columnActionKey] : undefined;
          column = {
            ...column,
            sorter: { multiple: columnAction.sort?.sortPriority },
            sortOrder: sortValue?.order,
            showSorterTooltip: false,
            sortIcon: ({ sortOrder }): ReactNode => {
              const sortOrder_ = sortOrder ?? undefined;
              return columnAction?.sort?.sortIcon?.(sortOrder_) ?? <SortIcon order={sortOrder_} />;
            },
          };
        }

        if (columnAction?.filter?.enable && columnAction.filter?.content) {
          const filterContent = columnAction.filter?.content?.(filterValueInState, value => {
            const nextFilterState = {
              ...(filterState.values ?? {}),
              [columnActionKey as string]: value,
            };
            setFilterState(state => {
              return {
                ...state,
                values: nextFilterState as FilterValues<ActionKey, ExtraFilterValues>,
              };
            });
          });
          filtersContent.push({
            content: filterContent,
            columnTitle: column.title,
            columnId: column.id,
          });
          column = {
            ...column,
            filtered: filterValue !== undefined,
            filterDropdownOpen: filterState.columnKey === columnActionKey,
            onFilterDropdownOpenChange: (open): void => {
              if (!columnActionKey) {
                return;
              }
              if (open) {
                setFilterState(state => {
                  return {
                    ...state,
                    values: filterValues,
                    columnKey: columnActionKey,
                  };
                });
              } else {
                setFilterState(state => {
                  return {
                    ...state,
                    values: undefined,
                    columnKey: undefined,
                  };
                });
              }
            },
            filterDropdown: (): ReactNode => {
              return (
                <div className="AntColumn__filterContainer">
                  <div className="AntColumn__filterContent">{filterContent}</div>
                  <div className="AntColumn__filterFooter">
                    <Button
                      type="text"
                      size="small"
                      onClick={() => {
                        const nextFilterState = {
                          ...(filterState.values ?? {}),
                          [columnActionKey as string]: undefined,
                        } as FilterValues<ActionKey, ExtraFilterValues>;
                        setFilterState(state => {
                          return {
                            ...state,
                            values: undefined,
                            columnKey: undefined,
                          };
                        });
                        onFilterChange?.(nextFilterState);
                      }}
                    >
                      {resetTextButton}
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      onClick={() => {
                        if (filterState.values) {
                          setFilterState(state => {
                            return {
                              ...state,
                              values: undefined,
                              columnKey: undefined,
                            };
                          });
                          onFilterChange?.(filterState.values);
                        }
                      }}
                    >
                      {applyTextButton}
                    </Button>
                  </div>
                </div>
              );
            },
          };
        }

        return {
          ...result,
          [column.id]: column,
        };
      },
      {},
    );

    return {
      columns,
      filtersContent,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    availableColumns,
    sortValues,
    filterState,
    filterState,
    selectedRecordsState,
    filterValues,
    applyTextButton,
    resetTextButton,
    // recordKey,
    // onFilterChange,
  ]);

  return antTableColumnsState;
};
