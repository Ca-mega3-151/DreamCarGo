import { useMemo } from 'react';
import { IdOfAntTableIndexColumn } from '../constants/IdOfAntTableIndexColumn';
import { Props } from '../Table';
import { AvailableColumnsState } from '../types/AvailableColumnsState';
import { ColumnsState } from '../types/ColumnsState';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export const useAvailableColumnsState = <
  RecordType extends AnyRecord,
  ActionKey extends string,
  ExtraFilterValues extends AnyRecord,
>({
  columns,
}: Props<RecordType, ActionKey, ExtraFilterValues>): {
  availableColumns: AvailableColumnsState<RecordType, ActionKey>;
  defaultVisibleOfColumns: ColumnsState;
} => {
  const availableColumnsState: {
    availableColumns: AvailableColumnsState<RecordType, ActionKey>;
    defaultVisibleOfColumns: ColumnsState;
  } = useMemo(() => {
    const defaultVisibleOfColumns: ColumnsState = [];
    const availableColumns = (columns ?? []).reduce<AvailableColumnsState<RecordType, ActionKey>>((result, column) => {
      if (column.hidden || !column.title || column.uid === IdOfAntTableIndexColumn) {
        return result;
      }
      const visible = column.defaultVisible !== false;
      defaultVisibleOfColumns.push({ id: column.uid, visible });
      return result.concat({
        id: column.uid,
        visible,
        rawData: column,
      });
    }, []);
    return { availableColumns, defaultVisibleOfColumns };
  }, [columns]);

  return availableColumnsState;
};
