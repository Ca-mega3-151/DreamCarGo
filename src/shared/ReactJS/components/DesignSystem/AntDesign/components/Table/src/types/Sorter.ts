import { SortOrder as AntSortOrder } from 'antd/es/table/interface';

export type SortOrder = Exclude<AntSortOrder, null> | undefined;
export type SortValues<ActionKey extends string> = Record<
  ActionKey,
  { order: SortOrder | undefined; priority?: number } | undefined
>;
