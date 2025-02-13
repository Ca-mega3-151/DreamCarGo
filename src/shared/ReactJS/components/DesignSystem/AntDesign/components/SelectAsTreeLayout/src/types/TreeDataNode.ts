import { ReactNode } from 'react';
import { Leaf } from './Leaf';

export interface TreeDataNode {
  /** Indicates whether the node is disabled. */
  disabled?: boolean;
  /** An array of child nodes, following the same `TreeDataNode` structure. */
  children: TreeDataNode[];
  /** The title or label that will be displayed for the tree node. */
  title: ReactNode;
  /** The unique value used to identify this tree node. */
  value: string;
  /** A string representing the search value associated with the node. */
  searchValue: string;
  /** The raw data associated with the node, retrieved from the `Leaf` object. */
  rawData: Leaf<any>['rawData'];
}
