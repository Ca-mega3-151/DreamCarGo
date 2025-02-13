import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import { Checkbox } from '../../../Checkbox';
import { defaultAutoIndex } from '../constants/defaultAutoIndex';
import { defaultCheckMode } from '../constants/defaultCheckMode';
import { defaultCurrentPage } from '../constants/defaultCurrentPage';
import { defaultPageSize } from '../constants/defaultPageSize';
import { defaultRecordSelectable } from '../constants/defaultRecordSelectable';
import { defaultSelectedRecordsState } from '../constants/defaultSelectedRecordsState';
import { IdOfAntTableIndexColumn } from '../constants/IdOfAntTableIndexColumn';
import { Props } from '../Table';
import { AntColumnProp } from '../types/AntColumnProp';
import { CellConfig } from '../types/ColumnType';
import { isRecordSelected } from '../utils/isRecordSelected';
import { useSelectableRecords } from './useSelectableRecords';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export const useAntTableIndexColumn = <
  RecordType extends AnyRecord,
  ActionKey extends string,
  ExtraFilterValues extends AnyRecord,
>(
  props: Props<RecordType, ActionKey, ExtraFilterValues>,
): {
  antTableIndexColumnWidth: number;
  antTableIndexColumn: AntColumnProp;
} => {
  const {
    select: {
      selectedRecordsState = defaultSelectedRecordsState,
      setSelectedRecordsState,
      renderStickyAction,
      recordSelectable = defaultRecordSelectable,
      checkMode = defaultCheckMode,
    } = {},

    autoIndex = defaultAutoIndex,
    recordKey,

    pagination: { pageSize = defaultPageSize, currentPage = defaultCurrentPage } = {},
  } = props;

  const { dataInPageSelectable, isCheckedAll } = useSelectableRecords(props);

  const antIndexColumnState = useMemo(() => {
    let antTableIndexColumnWidth = 0;
    let antTableIndexColumn: AntColumnProp = [];

    if (autoIndex) {
      if (renderStickyAction && setSelectedRecordsState) {
        const hasRecordIsSelectable = !!dataInPageSelectable.find(record => {
          return recordSelectable(record);
        });
        antTableIndexColumn = [
          {
            id: IdOfAntTableIndexColumn,
            width: 70,
            fixed: 'left',
            align: 'center',
            onCell: (record): CellConfig => {
              const isSelected = isRecordSelected({ record, recordKey, selectedRecordsState });
              return {
                className: classNames(isSelected ? 'AntCell__selected' : ''),
              };
            },
            title: hasRecordIsSelectable ? (
              <div>
                <Checkbox
                  className="AntCell__checkbox"
                  valueVariant="controlled-state"
                  checked={isCheckedAll}
                  onChange={checked => {
                    let nextState = selectedRecordsState;
                    if (checkMode === 'autoClear') {
                      nextState = checked ? (dataInPageSelectable as RecordType[]) : [];
                    } else if (checkMode === 'keepPagination') {
                      if (checked) {
                        dataInPageSelectable.forEach(record => {
                          if (!isRecordSelected({ record, recordKey, selectedRecordsState })) {
                            nextState = selectedRecordsState?.concat(record);
                          }
                        });
                      } else {
                        nextState = selectedRecordsState?.filter(record => {
                          return !isRecordSelected({ record, recordKey, selectedRecordsState });
                        });
                      }
                    }
                    setSelectedRecordsState?.(nextState);
                  }}
                >
                  #
                </Checkbox>
              </div>
            ) : (
              <div>#</div>
            ),
            render: (_value, record, index): ReactNode => {
              const selectable = recordSelectable?.(record);
              const recordIndex = pageSize * (currentPage - 1) + index + 1;
              if (selectable) {
                return (
                  <div>
                    <Checkbox
                      className="AntCell__checkbox"
                      valueVariant="controlled-state"
                      checked={!!isRecordSelected({ record, recordKey, selectedRecordsState })}
                      onChange={checked => {
                        const nextState = checked
                          ? (selectedRecordsState ?? []).concat(record)
                          : (selectedRecordsState ?? []).filter(item => {
                              return recordKey?.(item) !== recordKey?.(record);
                            });
                        setSelectedRecordsState?.(nextState);
                      }}
                    >
                      {recordIndex}
                    </Checkbox>
                  </div>
                );
              }
              return <div>{recordIndex}</div>;
            },
          },
        ];
        antTableIndexColumnWidth += 70;
      } else {
        antTableIndexColumn = [
          {
            id: IdOfAntTableIndexColumn,
            title: '#',
            width: 48,
            align: 'center',
            render: (_value, _record, index): ReactNode => {
              return pageSize * (currentPage - 1) + index + 1;
            },
          },
        ];
        antTableIndexColumnWidth += 48;
      }
    }

    return {
      antTableIndexColumnWidth,
      antTableIndexColumn,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoIndex, checkMode, currentPage, dataInPageSelectable, isCheckedAll, pageSize, selectedRecordsState]);

  return antIndexColumnState;
};
