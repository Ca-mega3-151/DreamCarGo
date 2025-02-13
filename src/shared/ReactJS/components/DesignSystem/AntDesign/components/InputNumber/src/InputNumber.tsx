import { InputNumber as AntInputNumber, InputNumberProps as AntInputNumberProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, useRef, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props
  extends Pick<
    AntInputNumberProps<number>,
    | 'addonAfter'
    | 'addonBefore'
    | 'className'
    | 'disabled'
    | 'formatter'
    | 'max'
    | 'min'
    | 'parser'
    | 'prefix'
    | 'step'
    | 'suffix'
    | 'readOnly'
    | 'size'
  > {
  /** Whether to show the controls. */
  controls?: boolean;
  /** The value of the input number. */
  value?: number;
  /** Callback function triggered when the input number value changes. */
  onChange?: (value?: number) => void;
  /** Callback function triggered when FIXME:. */
  onPressEnter?: (value: number | undefined) => void;
  /** Determines if the input number is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The placeholder text for the input number. */
  placeholder: string;
}

/**
 * InputNumber component that extends the functionality of the Ant Design InputNumber component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design InputNumber component.
 *
 * @param {Props} props - The properties for the InputNumber component.
 * @param {ReactNode} [props.addonAfter] - The element to display on the right side of the input number field.
 * @param {ReactNode} [props.addonBefore] - The element to display on the left side of the input number field.
 * @param {boolean} [props.controls=true] - Whether to show the controls.
 * @param {string} [props.className] - Custom CSS class for styling the input number.
 * @param {boolean} [props.disabled] - Whether the input number is disabled.
 * @param {Function} [props.formatter] - Specifies the format of the value presented.
 * @param {number} [props.max] - The maximum value of the input number.
 * @param {number} [props.min=0] - The minimum value of the input number.
 * @param {Function} [props.parser] - Specifies the value extracted from the formatted value.
 * @param {string} [props.placeholder] - The placeholder text for the input number.
 * @param {ReactNode} [props.prefix] - The prefix icon or text for the input number.
 * @param {number} [props.step] - The step size for the input number.
 * @param {ReactNode} [props.suffix] - The suffix icon or text for the input number.
 * @param {boolean} [props.readOnly=false] - Whether the input number is read-only.
 * @param {number} [props.value] - The value of the input number.
 * @param {Function} [props.onChange] - Callback function triggered when the input number value changes.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the input number is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of input.
 * @returns {ReactNode} The rendered InputNumber component.
 */
export const InputNumber: FC<Props> = ({
  addonAfter,
  addonBefore,
  className,
  controls = true,
  disabled,
  formatter,
  max,
  min = 0,
  onChange,
  onPressEnter,
  parser,
  placeholder,
  prefix,
  readOnly = false,
  size,
  step,
  suffix,
  value,
  valueVariant = 'controlled-state',
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntInputNumberProps<number>['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : Number(value);
    setValueState(value_);
    onChange?.(value_);
  };

  const initSessionValue = useRef<number | undefined>(undefined);
  const handleFocus: AntInputNumberProps<number>['onFocus'] = () => {
    initSessionValue.current = valueState;
  };
  const handleBlur: AntInputNumberProps<number>['onBlur'] = () => {
    const isDirty = initSessionValue.current !== valueState;
    initSessionValue.current = undefined;
    if (readOnly || !isDirty) {
      return;
    }
    onPressEnter?.(valueState);
  };

  const handleKeydown: AntInputNumberProps<number>['onKeyDown'] = event => {
    const target = event.target as HTMLInputElement | null;
    // User type Ctrl + A or Meta + A ==> Accept
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    // If value is decimal ==> just allow input number
    if (event.key.length === 1 && target?.value.includes('.') && !/[0-9]/.test(event.key)) {
      event.preventDefault();
      return;
    }
    // If value is not decimal ==> allow input number & input "." to convert decimal
    if (event.key.length === 1 && !target?.value.includes('.') && !/[0-9]|\./.test(event.key)) {
      event.preventDefault();
      return;
    }
  };

  const handlePressEnter: AntInputNumberProps['onPressEnter'] = () => {
    const isDirty = initSessionValue.current !== valueState;
    initSessionValue.current = valueState;
    if (readOnly || !isDirty) {
      return;
    }
    onPressEnter?.(valueState);
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
    if (onPressEnter) {
      return valueState;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntInputNumber<number>
      size={size}
      keyboard
      readOnly={readOnly}
      step={step}
      controls={controls}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      className={classNames('AntInputNumber__container', readOnly ? 'AntInputNumber__readOnly' : '', className)}
      disabled={disabled}
      max={max}
      min={min}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      formatter={formatter}
      parser={parser}
      tabIndex={readOnly ? -1 : undefined}
      value={mergedValueState}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeydown}
      onPressEnter={handlePressEnter}
    />
  );
};
