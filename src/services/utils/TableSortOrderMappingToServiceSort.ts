import { SorterOperator } from '../constants/SorterOperator';
import { TableSortOrder } from '~/shared/ReactJS';

export const getTableSortOrderMappingToServiceSort = (order: TableSortOrder): SorterOperator | undefined => {
  return !order ? undefined : order === 'ascend' ? SorterOperator.Ascend : SorterOperator.Descend;
};
