import { ColumnGroupType as AntColumnGroupType, ColumnType as AntColumnType } from 'antd/es/table';
import { ReactNode } from 'react';
import { SortOrder } from './Sorter';

type TakeBaseProps = 'align' | 'className' | 'fixed' | 'onCell';
export type ColumnGroupType<RecordType> = Pick<AntColumnGroupType<RecordType>, TakeBaseProps | 'children'> & {
  title?: ReactNode;
  render: (
    record: RecordType,
    index: number,
  ) => ReturnType<Exclude<AntColumnGroupType<RecordType>['render'], undefined>>;
};
export type ColumnSingleType<RecordType, ActionKey extends string> = Pick<AntColumnType<RecordType>, TakeBaseProps> & {
  title?: ReactNode;
  actions?: {
    key?: ActionKey;
    sort?: {
      enable?: boolean;
      sortPriority?: number;
      sortIcon?: (order: SortOrder) => ReactNode;
    };
    filter?: {
      enable?: boolean;
      content?: (value: any, setValue: (value: any) => void) => ReactNode;
    };
  };
  render: (
    record: RecordType,
    index: number,
  ) => ReturnType<Exclude<AntColumnGroupType<RecordType>['render'], undefined>>;
};
type ColumnTypeOrGroupColumnType<RecordType extends Record<string, any>, ActionKey extends string> =
  | ColumnGroupType<RecordType>
  | ColumnSingleType<RecordType, ActionKey>;

export interface CellConfig {
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  onClick?: () => void;
}

export type ColumnUID = string;

export type ColumnType<
  RecordType extends Record<string, any>,
  ActionKey extends string = string,
> = ColumnTypeOrGroupColumnType<RecordType, ActionKey> & {
  width: number;
  hidden?: boolean;
  onCell?: (record: RecordType, index: number) => CellConfig;
  uid: ColumnUID;
  defaultVisible?: boolean;
};
