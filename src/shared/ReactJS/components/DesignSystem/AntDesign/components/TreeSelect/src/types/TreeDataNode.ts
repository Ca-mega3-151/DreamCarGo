import { BasicDataNode as AntBasicDataNode } from 'antd/es/tree';
import { ReactNode } from 'react';
import { Leaf } from './Leaf';

export type TreeDataNode = AntBasicDataNode & {
  /** The raw data associated with the tree node. */
  rawData: Leaf<any>['rawData'];
  /** The value used to identify or represent the node option. */
  optionValue: string;
  /** The label displayed for the node, which could be a string, JSX element, or any valid React node. */
  optionLabel: ReactNode;
  /** An array of child nodes, which follow the same `TreeDataNode` structure. */
  children: TreeDataNode[];
  /** A reference to the parent node's identifier (or `null` if this node is the root).  */
  parent: string | null;
  /** A flag indicating whether the node is hidden from view. */
  hidden: false;
};
