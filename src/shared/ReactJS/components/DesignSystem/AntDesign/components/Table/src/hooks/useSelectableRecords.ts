import { useMemo } from 'react';
import { defaultCurrentPage } from '../constants/defaultCurrentPage';
import { defaultDataSource } from '../constants/defaultDataSource';
import { defaultPageSize } from '../constants/defaultPageSize';
import { defaultRecordSelectable } from '../constants/defaultRecordSelectable';
import { defaultSelectedRecordsState } from '../constants/defaultSelectedRecordsState';
import { Props } from '../Table';
import { isRecordSelected } from '../utils/isRecordSelected';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export const useSelectableRecords = <
  RecordType extends AnyRecord,
  ActionKey extends string,
  ExtraFilterValues extends AnyRecord,
>(
  props: Props<RecordType, ActionKey, ExtraFilterValues>,
): { dataInPageSelectable: RecordType[]; isCheckedAll: boolean } => {
  const {
    pagination: { currentPage = defaultCurrentPage, pageSize = defaultPageSize } = {},
    dataSource = defaultDataSource,
    recordKey,
    select: { recordSelectable = defaultRecordSelectable, selectedRecordsState = defaultSelectedRecordsState } = {},
  } = props;

  const dataInPageSelectable = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (dataSource.length <= pageSize) {
      return dataSource.filter(item => {
        return recordSelectable?.(item);
      });
    }
    return dataSource.slice(startIndex, endIndex).filter(recordSelectable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, pageSize, currentPage]);

  const isCheckedAll = useMemo(() => {
    return (
      !!dataInPageSelectable.length &&
      dataInPageSelectable.every(record => {
        return isRecordSelected({ record, recordKey, selectedRecordsState });
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInPageSelectable, selectedRecordsState]);

  return {
    dataInPageSelectable,
    isCheckedAll,
  };
};
