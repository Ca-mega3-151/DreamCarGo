import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props
  extends Pick<AntCheckboxProps, 'children' | 'className' | 'checked' | 'disabled' | 'indeterminate'> {
  /** Callback function that is triggered when the checkbox state changes. */
  onChange?: (value: boolean) => void;
  /** If true, the checkbox is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the checkbox is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Checkbox component that extends the functionality of the Ant Design Checkbox component
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Checkbox component.
 *
 * @param {Props} props - The properties for the Checkbox component.
 * @param {ReactNode} [props.children] - Content to be displayed next to the checkbox.
 * @param {string} [props.className] - Custom CSS class for styling the checkbox.
 * @param {boolean} [props.checked] - Whether the checkbox is checked.
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled.
 * @param {boolean} [props.indeterminate] - Whether the checkbox is indeterminate.
 * @param {Function} [props.onChange] - Callback function triggered when the checkbox state changes.
 * @param {boolean} [props.readOnly] - If true, the checkbox is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the checkbox is controlled or uncontrolled state.
 * @returns {ReactNode} The rendered Checkbox component.
 */
export const Checkbox: FC<Props> = ({
  children,
  className,
  disabled,
  indeterminate,
  checked = false,
  onChange,
  readOnly = false,
  valueVariant = 'controlled-state',
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [checkedState, setCheckedState] = useState(checked);

  const handleChange: AntCheckboxProps['onChange'] = event => {
    if (readOnly) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange?.(event.target.checked);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setCheckedState(checked);
    }
  }, [checked]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return false;
    }
    return valueVariant === 'controlled-state' ? checked : checkedState;
  }, [checked, checkedState, isMounted, valueVariant]);

  return (
    <AntCheckbox
      children={children}
      className={classNames('AntCheckbox__container', readOnly ? 'AntCheckbox__readOnly' : '', className)}
      disabled={disabled}
      indeterminate={indeterminate}
      tabIndex={readOnly ? -1 : undefined}
      checked={mergedValueState}
      onChange={handleChange}
    />
  );
};
