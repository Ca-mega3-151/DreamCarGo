import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props
  extends Pick<
    AntSwitchProps,
    'className' | 'checked' | 'checkedChildren' | 'unCheckedChildren' | 'disabled' | 'loading' | 'size'
  > {
  /** Callback function triggered when the switch state changes. */
  onChange?: (value: boolean) => void;
  /** Whether the switch is read only. */
  readOnly?: boolean;
  /** Determines if the switch is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Switch component extends the functionality of the Ant Design Switch component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Switch component.
 *
 * @param {Props} props - The properties for the Switch component.
 * @param {boolean} [props.checked] - The checked state of the switch.
 * @param {boolean} [props.readOnly] - Whether the switch is read only.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the switch is controlled or uncontrolled state.
 * @param {ReactNode} [props.checkedChildren] - Content to be displayed when the switch is checked.
 * @param {string} [props.className] - Custom CSS class for styling the switch.
 * @param {boolean} [props.disabled] - Whether the switch is disabled.
 * @param {boolean} [props.loading] - Whether the switch is in loading state.
 * @param {Function} [props.onChange] - Callback function triggered when the switch state changes.
 * @param {ReactNode} [props.unCheckedChildren] - Content to be displayed when the switch is unchecked.
 * @param {string} [props.size] - The size of switch.
 * @returns {ReactNode} The rendered Switch component.
 */
export const Switch: FC<Props> = ({
  checked = false,
  readOnly,
  checkedChildren,
  className,
  disabled,
  loading,
  onChange,
  unCheckedChildren,
  valueVariant = 'controlled-state',
  size,
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [checkedState, setCheckedState] = useState(checked);

  const handleChange: AntSwitchProps['onChange'] = checked => {
    if (readOnly) {
      return;
    }
    setCheckedState(checked);
    onChange?.(checked);
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
    <AntSwitch
      size={size}
      checkedChildren={checkedChildren}
      className={classNames('AntSwitch__container', readOnly ? 'AntSwitch__readOnly' : '', className)}
      disabled={disabled}
      loading={loading}
      unCheckedChildren={unCheckedChildren}
      tabIndex={readOnly ? -1 : undefined}
      onChange={handleChange}
      checked={mergedValueState}
    />
  );
};
