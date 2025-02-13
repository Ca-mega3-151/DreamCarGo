import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ComponentProps, FC, FocusEventHandler, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

type AntInputProps = ComponentProps<typeof AntInput.OTP>;

export interface Props extends Pick<AntInputProps, 'disabled' | 'formatter' | 'mask' | 'size'> {
  /** Custom CSS class for styling the input field. */
  className?: string;
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes.
   * @param {string} value - The new value of the input.
   */
  onChange?: (value: string | undefined) => void;
  /** The length of the OTP input. */
  length: number;
  /** If true, the input otp is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the input otp is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * InputOTP component extends the functionality of the Ant Design OTP component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design OTP component.
 *
 * @param {Props} props - The properties for the InputOTP component.
 * @param {string} [props.className] - Custom CSS class for styling the input field.
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled.
 * @param {string} [props.value] - The value of the input field.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {number} props.length - The length of the OTP input.
 * @param {boolean} props.readOnly - If true, the input otp is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the input otp is controlled or uncontrolled state.
 * @param {Function} [props.formatter] - A function for formatting the displayed value.
 * @param {boolean} [props.mask] - Whether to mask the input characters.
 * @param {string} [props.size] - The size of input.
 * @returns {ReactNode} The rendered InputOTP component.
 */
export const InputOTP: FC<Props> = ({
  className,
  disabled = false,
  onChange,
  value = '',
  length,
  formatter,
  mask,
  readOnly = false,
  valueVariant = 'controlled-state',
  size,
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState<string | undefined>(value);

  const handleChange: AntInputProps['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : value;
    setValueState(value_);
    onChange?.(value_);
  };

  const handleFocus: FocusEventHandler<HTMLDivElement> = event => {
    if (readOnly) {
      event.target.blur();
      return;
    }
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
    <div className={classNames('AntInputOTP__container', readOnly ? 'AntInputOTP__readOnly' : '', className)}>
      <AntInput.OTP
        size={size}
        length={length}
        disabled={disabled}
        onFocus={handleFocus}
        formatter={formatter}
        mask={mask}
        onChange={handleChange}
        value={mergedValueState}
      />
    </div>
  );
};
