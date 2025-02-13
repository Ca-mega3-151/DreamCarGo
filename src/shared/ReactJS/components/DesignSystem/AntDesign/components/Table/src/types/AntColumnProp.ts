import { TableProps as AntTableProps } from 'antd';
import { ReactNode } from 'react';

export type AntColumnProp = Array<
  Omit<Exclude<AntTableProps['columns'], undefined>[number], 'title'> & { title?: ReactNode; id: string; width: number }
>;
