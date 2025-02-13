import { AutoComplete as AntAutoComplete, AutoCompleteProps as AntAutoCompleteProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { Loading } from '../../../../../UI';
import { useInitializeContext } from '../../../base';
import { Divider } from '../../Divider';
import './styles.css';
import { Option } from './types/Option';
import { OptionValueType } from './types/OptionValueType';
import { baseFilterOption } from './utils/baseFilterOption';

export interface Props<ValueType extends OptionValueType, RawData = any>
  extends Pick<
    AntAutoCompleteProps<ValueType, Option<ValueType, RawData>>,
    | 'allowClear'
    | 'disabled'
    | 'className'
    | 'notFoundContent'
    | 'filterOption'
    | 'searchValue'
    | 'open'
    | 'onSearch'
    | 'onDropdownVisibleChange'
    | 'size'
  > {
  /** The current input value. */
  value?: ValueType;
  /** Callback function that is triggered when the input value changes. */
  onChange?: (value: ValueType | undefined, option: Option<ValueType, RawData> | undefined) => void;
  /** Whether the component is in a loading state, showing a loading indicator. */
  loading?: boolean;
  /** Array of options to be displayed in the dropdown menu. */
  options?: Option<ValueType, RawData>[];
  /** If true, the auto-complete is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the auto-complete is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The footer to be displayed at the bottom of the auto-complete's dropdown. */
  footer?: ReactNode;
  /** Placeholder text to display when the input is empty. */
  placeholder: string;
}

/**
 * AutoComplete component extends the functionality of the Ant Design AutoComplete component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design AutoComplete component.
 *
 * @template ValueType - The type of the value for each option.
 * @template RawData - The raw data type for each option.
 *
 * @param {Props<ValueType, RawData>} props - The properties for the AutoComplete component.
 * @param {boolean} [props.allowClear=true] - Whether to show a clear button allowing the user to clear the input.
 * @param {boolean} [props.disabled] - Whether the AutoComplete component is disabled.
 * @param {string} [props.placeholder] - Placeholder text to display when the input is empty.
 * @param {string} [props.className] - Custom CSS class for styling the component.
 * @param {ReactNode} [props.notFoundContent] - Content to display when no options match the input.
 * @param {boolean} [props.loading=false] - Whether the component is in a loading state.
 * @param {string} [props.value] - The current value of the input.
 * @param {(value: string | undefined, option: Option<ValueType, RawData> | undefined) => void} [props.onChange] - Callback function that is triggered when the input value changes.
 * @param {boolean | ((inputValue: string, option: Option<ValueType, RawData>) => boolean)} [props.filterOption=baseFilterOption] - Custom filter function to determine whether an option should be shown in the dropdown.
 * @param {Option<ValueType, RawData>[]} [props.options=[]] - Array of options to be displayed in the dropdown menu.
 * @param {boolean} [props.open] - Whether the dropdown menu is open.
 * @param {string} [props.searchValue] - The value of the search input.
 * @param {Function} [props.onDropdownVisibleChange] - Callback function that is triggered when the dropdown visibility changes.
 * @param {Function} [props.onSearch] - Callback function that is triggered when the search input value changes.
 * @param {boolean} props.readOnly - If true, the auto-complete is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the auto-complete is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of the search input.
 * @param {ReactNode} [props.footer] - The footer to be displayed at the bottom of the auto-complete's dropdown.
 * @returns {ReactNode} The rendered AutoComplete component.
 */
export const AutoComplete = <ValueType extends OptionValueType, RawData = any>({
  allowClear = true,
  disabled,
  placeholder,
  className,
  notFoundContent,
  loading = false,
  value,
  filterOption = baseFilterOption,
  options = [],
  open,
  searchValue,
  onChange,
  onDropdownVisibleChange,
  onSearch,
  readOnly = false,
  valueVariant = 'controlled-state',
  size,
  footer,
}: Props<ValueType, RawData>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();

  const [valueState, setValueState] = useState(value);

  const handleChange: Props<ValueType>['onChange'] = (value, option) => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    setValueState(isUndefined ? undefined : value);
    onChange?.(isUndefined ? undefined : value, isUndefined ? undefined : option);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value);
    }
  }, [value]);

  const renderLoadingAtDropdown: FC = () => {
    return (
      <div className="AntAutoComplete__loading">
        <Loading size={60} />
      </div>
    );
  };

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    if (valueVariant === 'controlled-state') {
      return value ? value : undefined;
    }
    return valueState;
  }, [value, valueState, isMounted, valueVariant]);
  const mergedOpenState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return false;
    }
    return open;
  }, [isMounted, open]);

  return (
    <AntAutoComplete
      size={size}
      filterOption={filterOption}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={placeholder}
      open={mergedOpenState}
      searchValue={searchValue}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onSearch={onSearch}
      notFoundContent={loading ? renderLoadingAtDropdown({}) : notFoundContent}
      className={classNames('AntAutoComplete__container', readOnly ? 'AntAutoComplete__readOnly' : '', className)}
      tabIndex={readOnly ? -1 : undefined}
      options={options}
      value={mergedValueState}
      onChange={handleChange as AntAutoCompleteProps<ValueType, Option<ValueType, RawData>>['onChange']}
      dropdownRender={menu => {
        if (loading) {
          return <>{renderLoadingAtDropdown({})}</>;
        }
        return (
          <>
            {menu}
            {footer && (
              <div className="AntAutoComplete__footerContainer">
                <Divider className="AntAutoComplete__footerDivider" />
                <div className="AntAutoComplete__footerContent">{footer}</div>
              </div>
            )}
          </>
        );
      }}
    />
  );
};
