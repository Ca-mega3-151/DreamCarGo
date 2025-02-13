import { Tree as AntTree, TreeProps as AntTreeProps } from 'antd';
import { SwitcherIcon } from 'antd/es/tree/Tree';
import classNames from 'classnames';
import { isEmpty, nth } from 'ramda';
import { ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { Leaf } from './types/Leaf';
import { TreeDataNode } from './types/TreeDataNode';
import { leavesToAntTreeData } from './utils/leavesToAntTreeData';
import './css/TreeSelectSingle.css';

export interface Props<Model> extends Pick<AntTreeProps, 'className' | 'disabled' | 'height' | 'defaultExpandAll'> {
  /** The array of leaf nodes that make up the tree data */
  data: Leaf<Model>[];
  /** Callback function triggered when a node's selected state changes. */
  onChange?: (
    keys: undefined | string,
    option: undefined | Omit<Leaf<Model>, 'disabled' | 'hidden' | 'parent'>,
  ) => void;
  /** Customize expand/collapse icons for tree nodes (With default rotate angular style). */
  iconExpand?: (props: { expanded: boolean }) => ReactNode;
  /** The keys of the currently selected node. */
  value?: string;
  /** The keys of the currently expanded nodes. */
  expandedKeys?: string[];
  /** Callback function triggered when a node's expanded state changes. */
  onExpand?: (keys: string[]) => void;
  /** If true, the tree is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the tree is in a controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * TreeSelectSingle component extends the functionality of the Ant Design Tree component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tree component.
 *
 * @template Model - The type of the raw data associated with each leaf.
 * @param {Props<Model>} props - The props for the TreeSelectSingle component.
 * @param {string} [props.className] - The CSS class for styling the tree component.
 * @param {Leaf<Model>[]} props.data - The array of leaf nodes that make up the tree data.
 * @param {string[]} [props.value] - The keys of the currently selected node.
 * @param {boolean} [props.disabled] - Whether the entire tree is disabled.
 * @param {number} [props.height] - The height of the tree component.
 * @param {number} [props.defaultExpandAll] - Whether to expand all treeNodes by default.
 * @param {Function} [props.onChange] - Callback function triggered when a node's selected state changes.
 * @param {Function} [props.iconExpand] - Customize expand/collapse icons for tree nodes (With default rotate angular style).
 * @param {Function} [props.expandedKeys] - The keys of the currently expanded nodes.
 * @param {Function} [props.onExpand] - Callback function triggered when a node's expanded state changes.
 * @param {boolean} [props.readOnly] - If true, the tree is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the tree is in a controlled or uncontrolled state.
 * @returns {ReactNode} The rendered TreeSelectSingle component.
 */
export const TreeSelectSingle = <Model,>({
  className,
  data,
  value,
  disabled,
  height,
  onChange,
  iconExpand,
  defaultExpandAll = true,
  expandedKeys,
  onExpand,
  readOnly = false,
  valueVariant = 'controlled-state',
}: Props<Model>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const treeData = useMemo(() => {
    return leavesToAntTreeData(data);
  }, [data]);

  const handleSelect: AntTreeProps<TreeDataNode>['onSelect'] = (keys, info) => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(keys) || null;
    const value_ = isUndefined ? undefined : (nth(0, keys) as string);
    const option_ = isUndefined ? undefined : nth(0, info.selectedNodes);
    setValueState(value_);
    onChange?.(
      value_,
      option_ ? { label: option_.optionLabel, rawData: option_.rawData, value: option_.optionValue } : undefined,
    );
  };

  const switcherIcon: SwitcherIcon = ({ expanded }) => {
    return iconExpand?.({ expanded: !!expanded });
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value);
    }
  }, [value]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntTree<TreeDataNode>
      // Fixed props
      autoExpandParent={false}
      blockNode
      checkable={false}
      draggable={false}
      focusable
      multiple={false}
      selectable
      showIcon={false}
      showLine={false}
      virtual
      // Customizable props
      defaultExpandAll={defaultExpandAll}
      {...(expandedKeys ? { expandedKeys } : {})}
      onExpand={data => {
        return onExpand?.(data as string[]);
      }}
      switcherIcon={switcherIcon}
      selectedKeys={mergedValueState ? [mergedValueState] : []}
      disabled={disabled}
      className={classNames(
        'AntTreeSelectSingle__container',
        readOnly ? 'AntTreeSelectSingle__readOnly' : '',
        className,
      )}
      height={height}
      treeData={treeData}
      onSelect={handleSelect}
      fieldNames={{
        title: 'optionLabel',
        key: 'optionValue',
      }}
      tabIndex={readOnly ? -1 : undefined}
    />
  );
};
