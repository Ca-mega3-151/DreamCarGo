import { TreeSelect as AntTreeSelect, TreeSelectProps as AntTreeSelectProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { Loading } from '../../../../../UI';
import { useInitializeContext } from '../../../base';
import './css/SelectSingleAsTreeLayout.css';
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
    | 'showCheckedStrategy'
  > {
  /** The array of leaf nodes that make up the tree data */
  data: Leaf<Model>[];
  /** Callback function triggered when a node's selected state changes. */
  onChange?: (
    keys: undefined | string,
    option: undefined | Omit<Leaf<Model>, 'disabled' | 'hidden' | 'parent'>,
  ) => void;
  /** The keys of the currently selected node. */
  value?: string;
  /** If true, the tree is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the tree is in a controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Determines if the open state is in a controlled or uncontrolled state. */
  openVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Placeholder text displayed when no selection is made. */
  placeholder: string;
}

/**
 * SelectSingleAsTreeLayout component extends the functionality of the Ant Design Tree Select component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tree Select component.
 *
 * @template Model - The type of the raw data associated with each leaf node.
 * @param {Props<Model>} props - The props for the SelectSingleAsTreeLayout component.
 * @param {Leaf<Model>[]} props.data - The array of leaf nodes that make up the tree data.
 * @param {string} [props.value] - The keys of the currently selected node.
 * @param {Function} [props.onChange] - Callback function triggered when a node's selected state changes.
 * @param {boolean} [props.loading] - Indicates whether the tree is in a loading state.
 * @param {ReactNode} [props.notFoundContent] - Content displayed when no data is found.
 * @param {boolean} [props.allowClear=true] - If true, allows the user to clear the selection.
 * @param {string} [props.placeholder] - Placeholder text displayed when no selection is made.
 * @param {boolean} [props.disabled] - If true, disables the entire tree.
 * @param {boolean} [props.autoClearSearchValue=true] - Automatically clears the search value when an option is selected.
 * @param {string} [props.className] - CSS class name for the component.
 * @param {'ltr' | 'rtl'} [props.direction] - Layout direction, either 'ltr' (left to right) or 'rtl' (right to left).
 * @param {Function} [props.onDropdownVisibleChange] - Callback function triggered when the dropdown visibility changes.
 * @param {Function} [props.onSearch] - Callback function triggered when the user types in the search box.
 * @param {boolean} [props.open] - Whether the dropdown is open or not.
 * @param {string} [props.searchValue] - The current search value in the input box.
 * @param {boolean} [props.readOnly=false] - If true, the tree is read-only and cannot be modified by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant='uncontrolled-state'] - Determines if the tree is in a controlled or uncontrolled state.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.openVariant='uncontrolled-state'] - Determines if the open state is in a controlled or uncontrolled state.
 * @param {string} [props.size] - Size of the tree selection input (e.g., 'small', 'middle', 'large').
 * @param {boolean} [props.showSearch=true] - If true, shows a search input to filter tree nodes.
 * @param {string} [props.showCheckedStrategy='SHOW_PARENT'] - Strategy for showing selected items ('SHOW_PARENT' or other strategies).
 * @param {Function} [props.filterTreeNode=baseFilterOption] - Custom function to filter tree nodes based on user input.
 * @returns {ReactNode} The rendered SelectSingleAsTreeLayout component.
 */
export const SelectSingleAsTreeLayout = <Model,>({
  value,
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
  showCheckedStrategy = 'SHOW_PARENT',
  openVariant = 'uncontrolled-state',
}: Props<Model>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value === '' ? undefined : value);
  const [openState, setOpenState] = useState(open);

  const handleChange: Props<Model>['onChange'] = (value, option) => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    setValueState(isUndefined ? undefined : value);
    onChange?.(isUndefined ? undefined : value, isUndefined ? undefined : option);
  };

  const handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value === '' ? undefined : value);
    }
  }, [value]);
  useDeepCompareEffect(() => {
    if (isMounted) {
      setOpenState(open);
    }
  }, [open]);

  const renderLoadingAtDropdown: FC = () => {
    return (
      <div className="AntSelectSingleAsTreeLayout__loading">
        <Loading size={60} />
      </div>
    );
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
      treeCheckable={false}
      //
      showCheckedStrategy={showCheckedStrategy}
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
        'AntSelectSingleAsTreeLayout__container',
        readOnly ? 'AntSelectSingleAsTreeLayout__readOnly' : '',
        className,
      )}
      onDropdownVisibleChange={open => {
        setOpenState(open);
        onDropdownVisibleChange?.(open);
      }}
      onSearch={onSearch}
      open={mergedOpenState}
      searchValue={searchValue}
      loading={loading}
      treeData={treeData}
      onChange={value => {
        const option = data.find(item => {
          return item.value === value;
        });
        handleChange(value, option);
      }}
      value={mergedValueState}
    />
  );
};
