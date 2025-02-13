import { Segmented as AntSegmented, SegmentedProps as AntSegmentedProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props<Value extends string>
  extends Pick<AntSegmentedProps<string>, 'className' | 'block' | 'disabled' | 'size'> {
  /** The items to be displayed in the segmented control */
  items?: Array<{
    /** The label of the item */
    label?: ReactNode;
    /** The value of the item */
    value: Value;
    /** The icon of the item */
    icon?: ReactNode;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether the item is hidden */
    hidden?: boolean;
  }>;
  /** The value of the segmented control */
  value?: Value;
  /** Callback function triggered when the value changes */
  onChange?: (value: undefined | Value) => void;
  /** Determines if the segmented is in a controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Segmented component extends the functionality of the Ant Design Segmented component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Segmented component.
 *
 * @param {Props<Value>} props - The properties for the Segmented component.
 * @param {string} [props.className] - Custom CSS class for styling the segmented control.
 * @param {boolean} [props.block] - Whether the segmented control should take up the full width of its container.
 * @param {boolean} [props.disabled] - Whether the segmented control is disabled.
 * @param {Array} [props.items=[]] - The items to be displayed in the segmented control.
 * @param {string} [props.value] - The value of the segmented control.
 * @param {Function} [props.onChange] - Callback function triggered when the value changes.
 * @param {string} [props.size] - The size of segmented.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the segmented is in a controlled or uncontrolled state.
 * @returns {ReactNode} The rendered Segmented component.
 */
export const Segmented = <Value extends string>({
  block,
  className,
  disabled,
  items = [],
  onChange,
  value,
  size,
  valueVariant,
}: Props<Value>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntSegmentedProps<string>['onChange'] = value => {
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : (value as Value);
    setValueState(value_);
    onChange?.(value_);
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
      return undefined;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntSegmented
      size={size}
      block={block}
      className={classNames('AntSegmented__container', className)}
      disabled={disabled}
      options={items_ as AntSegmentedProps<string>['options']}
      onChange={handleChange}
      value={mergedValueState}
    />
  );
};
