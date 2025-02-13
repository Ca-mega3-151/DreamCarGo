import { ReactNode } from 'react';

export interface Leaf<Model> {
  /** The value of the leaf node, typically used as its unique identifier */
  value: string;
  /** The display label of the leaf node */
  label: ReactNode;
  /** The raw data associated with the leaf node */
  rawData: Model;
  /** The value of the parent node, or null if this is a root node */
  parent: string | null;
  /** Whether the leaf node is disabled */
  disabled?: boolean;
  /** Whether the leaf node is hidden */
  hidden?: boolean;
}
