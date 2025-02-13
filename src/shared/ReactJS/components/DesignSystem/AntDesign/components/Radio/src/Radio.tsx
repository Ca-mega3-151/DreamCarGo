import { Radio as AntRadio, RadioGroupProps as AntRadioGroupProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FocusEventHandler, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props<Value extends string>
  extends Pick<AntRadioGroupProps, 'className' | 'disabled' | 'optionType' | 'size'> {
  /** The currently selected value. */
  value?: Value;
  /**
   * Callback function triggered when the selected value changes.
   * @param {Value} value - The new selected value.
   */
  onChange?: (value: undefined | Value) => void;
  /** The list of radio items. */
  items: Array<{
    /** The label of the radio item. */
    label: ReactNode;
    /** The value of the radio item. */
    value: Value;
    /** Whether the radio item is disabled. */
    disabled?: boolean;
    /** Whether the radio item is hidden. */
    hidden?: boolean;
    /** The class name to be applied to radio item. */
    className?: string;
  }>;
  /** If true, the radio is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the radio is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Radio component extends the functionality of the Ant Design Radio component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Radio component.
 *
 * @param {Props<Value>} props - The properties for the Radio component.
 * @param {string} [props.className] - Custom CSS class for styling the radio group.
 * @param {boolean} [props.disabled] - Whether the radio group is disabled.
 * @param {Function} [props.onChange] - Callback function triggered when the selected value changes.
 * @param {string} [props.value] - The currently selected value.
 * @param {Array<{ label: ReactNode, value: string, disabled?: boolean, hidden?: boolean }>} props.items - The list of radio items.
 * @param {boolean} props.readOnly - If true, the radio is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the radio is controlled or uncontrolled state.
 * @param {string} [props.optionType] - The option type of the radio group.
 * @param {string} [props.size] - The size of radio (Only work with "optionType" is button).
 * @returns {ReactNode} The rendered Radio component.
 */
export const Radio = <Value extends string>({
  className,
  disabled,
  onChange,
  value,
  items,
  optionType,
  readOnly = false,
  valueVariant,
  size,
}: Props<Value>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntRadioGroupProps['onChange'] = event => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    setValueState(value);
    onChange?.(value);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (readOnly) {
      event.target.blur();
    }
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value);
    }
  }, [value]);

  const items_ = useMemo(() => {
    return items.filter(item => {
      return !item.hidden;
    });
  }, [items]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return '';
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntRadio.Group
      size={size}
      optionType={optionType}
      className={classNames('AntRadio__container', readOnly ? 'AntRadio__readOnly' : '', className)}
      disabled={disabled}
      onFocus={handleFocus}
      options={items_}
      value={mergedValueState}
      onChange={handleChange}
    />
  );
};
