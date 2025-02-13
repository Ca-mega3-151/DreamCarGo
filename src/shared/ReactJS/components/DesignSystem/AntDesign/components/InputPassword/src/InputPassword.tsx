import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ComponentProps, FC, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

type AntInputProps = ComponentProps<typeof AntInput.Password>;

export interface Props
  extends Pick<
    AntInputProps,
    | 'addonAfter'
    | 'addonBefore'
    | 'allowClear'
    | 'className'
    | 'disabled'
    | 'maxLength'
    | 'prefix'
    | 'iconRender'
    | 'readOnly'
    | 'size'
  > {
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes.
   * @param {string} value - The new value of the input.
   */
  onChange?: (value: string | undefined) => void;
  /** Whether the password is show or hide */
  visible?: boolean;
  /** Callback executed when visibility of the password is changed */
  onVisibleChange?: (visible: boolean) => void;
  /** Determines if the input password is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The placeholder text for the input field. */
  placeholder: string;
}

/**
 * InputPassword component extends the functionality of the Ant Design Password component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Password component.
 *
 * @param {Props} props - The properties for the InputPassword component.
 * @param {ReactNode} [props.addonAfter] - The element to display on the right side of the input field.
 * @param {ReactNode} [props.addonBefore] - The element to display on the left side of the input field.
 * @param {boolean} [props.allowClear=true] - Whether to allow clear the input field.
 * @param {string} [props.className] - Custom CSS class for styling the input field.
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled.
 * @param {number} [props.maxLength] - The maximum length of the input value.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {ReactNode} [props.prefix] - The prefix icon or text for the input field.
 * @param {boolean} [props.readOnly=false] - Whether the input is read-only.
 * @param {string} [props.value] - The value of the input field.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {Function} [props.iconRender] - Custom icon render function for the visibility toggle button.
 * @param {boolean} [props.visible] - Whether the password is shown or hidden.
 * @param {Function} [props.onVisibleChange] - Callback executed when the visibility of the password is changed.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the input password is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of input.
 * @returns {ReactNode} The rendered InputPassword component.
 */
export const InputPassword: FC<Props> = ({
  addonAfter,
  addonBefore,
  allowClear = true,
  className,
  disabled = false,
  maxLength,
  onChange,
  placeholder,
  prefix,
  value = '',
  iconRender,
  onVisibleChange,
  visible,
  readOnly = false,
  valueVariant = 'controlled-state',
  size,
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntInputProps['onChange'] = event => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    setValueState(value ?? '');
    onChange?.(value);
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
    <AntInput.Password
      size={size}
      variant={readOnly ? 'borderless' : 'outlined'}
      readOnly={readOnly}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      className={classNames('AntInputPassword__container', readOnly ? 'AntInputPassword__readOnly' : '', className)}
      disabled={disabled}
      maxLength={maxLength}
      placeholder={placeholder}
      prefix={prefix}
      iconRender={iconRender}
      visibilityToggle={{ visible, onVisibleChange }}
      value={mergedValueState}
      onChange={handleChange}
    />
  );
};
