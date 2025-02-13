import { TreeSelect as AntTreeSelect, TreeSelectProps as AntTreeSelectProps } from 'antd';
import { SwitcherIcon } from 'antd/es/tree/Tree';
import classNames from 'classnames';
import { FC, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { Loading } from '../../../../../UI';
import { useInitializeContext } from '../../../base';
import './css/SelectMultipleAsTreeLayout.css';
import { Leaf } from './types/Leaf';
import { baseFilterOption } from './utils/baseFilterOption';
import { leavesToAntTreeData } from './utils/leavesToAntTreeData';

export interface Props<Model>
  extends Pick<
    AntTreeSelectProps,
    | 'className'
    | 'allowClear'
    | 'loading'
    | 'notFoundContent'
    | 'disabled'
    | 'autoClearSearchValue'
    | 'filterTreeNode'
    | 'direction'
    | 'searchValue'
    | 'open'
    | 'onSearch'
    | 'onDropdownVisibleChange'
    | 'size'
    | 'showSearch'
    | 'treeCheckable'
    | 'showCheckedStrategy'
  > {
  /** The array of leaf nodes that make up the tree data */
  data: Leaf<Model>[];
  /** Callback function triggered when a node's selected state changes. */
  onChange?: (keys: string[], option: Omit<Leaf<Model>, 'disabled' | 'hidden' | 'parent'>[]) => void;
  /** The keys of the currently selected node. */
  value?: string[];
  /** If true, the tree is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Customize expand/collapse icons for tree nodes (With default rotate angular style). */
  iconExpand?: (props: { expanded: boolean }) => ReactNode;
  /** Determines if the tree is in a controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Determines if the open state is in a controlled or uncontrolled state. */
  openVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Placeholder text displayed when no selection is made. */
  placeholder: string;
}

/**
 * SelectMultipleAsTreeLayout component extends the functionality of the Ant Design Tree Select component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tree Select component.
 *
 * @template Model - The type of the raw data associated with each leaf node.
 * @param {Props<Model>} props - The props for the SelectMultipleAsTreeLayout component.
 * @param {Leaf<Model>[]} props.data - The array of leaf nodes that make up the tree data.
 * @param {string[]} [props.value=[]] - The keys of the currently selected nodes.
 * @param {Function} [props.onChange] - Callback function triggered when the selected state of a node changes.
 * @param {boolean} [props.loading] - Indicates whether the tree is in a loading state.
 * @param {ReactNode} [props.notFoundContent] - Content displayed when no data is found.
 * @param {boolean} [props.allowClear=true] - If true, allows the user to clear the selection.
 * @param {string} [props.placeholder] - Placeholder text displayed when no nodes are selected.
 * @param {boolean} [props.disabled] - If true, disables the entire tree.
 * @param {boolean} [props.autoClearSearchValue=true] - If true, automatically clears the search value when a node is selected.
 * @param {string} [props.className] - The CSS class for styling the component.
 * @param {'ltr' | 'rtl'} [props.direction] - Layout direction (either 'ltr' for left-to-right or 'rtl' for right-to-left).
 * @param {Function} [props.onDropdownVisibleChange] - Callback function triggered when the dropdown's visibility changes.
 * @param {Function} [props.onSearch] - Callback function triggered when a search is performed.
 * @param {boolean} [props.open] - Whether the dropdown is open or not.
 * @param {string} [props.searchValue] - The current search input value.
 * @param {boolean} [props.readOnly=false] - If true, the tree is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant='uncontrolled-state'] - Determines if the tree is in a controlled or uncontrolled state.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.openVariant='uncontrolled-state'] - Determines if the open state is in a controlled or uncontrolled state.
 * @param {string} [props.size] - The size of the input box (e.g., 'small', 'middle', 'large').
 * @param {boolean} [props.showSearch=true] - If true, a search input is shown for filtering tree nodes.
 * @param {boolean} [props.treeCheckable=false] - If true, allows for checking multiple tree nodes.
 * @param {Function} [props.iconExpand] - Customize the expand/collapse icons for tree nodes.
 * @param {string} [props.showCheckedStrategy='SHOW_PARENT'] - Strategy for showing selected nodes (e.g., 'SHOW_PARENT').
 * @param {Function} [props.filterTreeNode=baseFilterOption] - Custom function to filter tree nodes based on search input.
 * @returns {ReactNode} The rendered SelectMultipleAsTreeLayout component.
 */
export const SelectMultipleAsTreeLayout = <Model,>({
  value = [],
  onChange,
  loading,
  notFoundContent,
  allowClear = true,
  placeholder,
  disabled,
  autoClearSearchValue = true,
  className,
  direction,
  onDropdownVisibleChange,
  onSearch,
  open,
  searchValue,
  readOnly = false,
  valueVariant = 'controlled-state',
  size,
  showSearch = true,
  data,
  filterTreeNode = baseFilterOption,
  treeCheckable = false,
  iconExpand,
  showCheckedStrategy = 'SHOW_PARENT',
  openVariant = 'uncontrolled-state',
}: Props<Model>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState<string[]>(value);
  const [openState, setOpenState] = useState(open);

  const handleChange: Props<Model>['onChange'] = (value, option) => {
    if (readOnly) {
      return;
    }
    setValueState(value);
    onChange?.(value, option);
  };

  const handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value);
    }
  }, [value]);
  useDeepCompareEffect(() => {
    if (isMounted) {
      setOpenState(open);
    }
  }, [open]);

  const renderLoadingAtDropdown: FC = () => {
    return (
      <div className="AntSelectMultipleAsTreeLayout__loading">
        <Loading size={60} />
      </div>
    );
  };

  const switcherIcon: SwitcherIcon = ({ expanded }) => {
    return iconExpand?.({ expanded: !!expanded });
  };

  const treeData = useMemo(() => {
    return leavesToAntTreeData(data);
  }, [data]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);
  const mergedOpenState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return false;
    }
    return openVariant === 'controlled-state' ? open : openState;
  }, [isMounted, open]);

  return (
    <AntTreeSelect
      treeDefaultExpandAll
      popupMatchSelectWidth
      virtual
      multiple
      //
      showCheckedStrategy={showCheckedStrategy}
      switcherIcon={switcherIcon}
      treeCheckable={treeCheckable}
      disabled={disabled}
      tabIndex={readOnly ? -1 : undefined}
      size={size}
      showSearch={showSearch}
      direction={direction}
      filterTreeNode={filterTreeNode}
      autoClearSearchValue={autoClearSearchValue}
      placeholder={placeholder}
      onClick={handleClick}
      notFoundContent={loading ? renderLoadingAtDropdown({}) : notFoundContent}
      allowClear={loading ? false : allowClear}
      className={classNames(
        'AntSelectMultipleAsTreeLayout__container',
        readOnly ? 'AntSelectMultipleAsTreeLayout__readOnly' : '',
        className,
      )}
      onDropdownVisibleChange={open => {
        onDropdownVisibleChange?.(open);
        setOpenState(open);
      }}
      onSearch={onSearch}
      open={mergedOpenState}
      searchValue={searchValue}
      loading={loading}
      treeData={treeData}
      onChange={value => {
        const options = data.filter(item => {
          return value.includes(item.value);
        });
        handleChange(value, options);
      }}
      value={mergedValueState}
    />
  );
};
