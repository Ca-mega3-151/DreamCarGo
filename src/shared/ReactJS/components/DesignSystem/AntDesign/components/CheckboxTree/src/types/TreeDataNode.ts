import { BasicDataNode as AntBasicDataNode } from 'antd/es/tree';
import { ReactNode } from 'react';
import { Leaf } from './Leaf';

export type TreeDataNode = AntBasicDataNode & {
  rawData: Leaf<any>['rawData'];
  checkboxValue: string;
  checkboxLabel: ReactNode;
  children: TreeDataNode[];
  parent: string | null;
  hidden: false;
};
