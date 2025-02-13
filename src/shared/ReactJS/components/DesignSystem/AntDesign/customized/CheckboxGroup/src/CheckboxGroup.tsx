import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useState } from 'react';
import { useDeepCompareEffect } from '../../../../../../hooks';
import { Checkbox } from '../../../components/Checkbox';
import './styles.css';

export interface Option<Value extends string, RawData> {
  /** The label of the checkbox item. */
  label: ReactNode;
  /** The value of the checkbox item. */
  value: Value;
  /** Whether the checkbox item is disabled. */
  disabled?: boolean;
  /** Whether the checkbox item is read only */
  readOnly?: boolean;
  /** Whether the checkbox item is hidden. */
  hidden?: boolean;
  /** The class name to be applied to checkbox item. */
  className?: string;
  /** The raw data associated with the option. */
  rawData: RawData;
}

export interface Props<Value extends string, RawData> {
  /** The currently selected value. */
  value?: Value[];
  /** Callback function triggered when the selected value changes. */
  onChange?: (value: undefined | Value[], target: { option: Option<Value, RawData>; checked: boolean }) => void;
  /** The list of checkbox items. */
  items: Option<Value, RawData>[];
  /** The class name to be applied to the checkbox group container */
  className?: string;
  /** Whether the checkbox group is disabled. */
  disabled?: boolean;
  /** If true, the checkbox group is read-only and cannot be changed by the user. */
  readOnly?: boolean;
}

/**
 * CheckboxGroup component that renders a group of checkbox items.
 * It allows customization and supports strict type safety for the options and their associated data.
 *
 * @template Value - The type of the option value.
 * @template RawData - The type of the raw data associated with the option.
 *
 * @param {Props<Value, RawData>} props - The properties for the CheckboxGroup component.
 * @param {Option<Value, RawData>[]} props.items - The list of checkbox items.
 * @param {Function} [props.onChange] - Callback function triggered when the selected value changes.
 * @param {Value[]} [props.value] - The currently selected value.
 * @param {string} [props.className] - The class name to be applied to the checkbox group container.
 * @param {boolean} [props.disabled] - Whether the checkbox group is disabled.
 * @param {boolean} [props.readOnly] - If true, the checkbox group is read-only and cannot be changed by the user.
 * @returns {ReactNode} The rendered CheckboxGroup component.
 */
export const CheckboxGroup = <Value extends string, RawData = any>({
  items,
  onChange,
  value = [],
  className,
  disabled,
  readOnly,
}: Props<Value, RawData>): ReactNode => {
  const [valueState, setValueState] = useState(value);

  const handleChange = (option: Option<Value, RawData>, checked: boolean): void => {
    if (readOnly) {
      return;
    }
    const nextValueState = checked
      ? valueState.concat(option.value)
      : valueState.filter(item => {
          return item !== option.value;
        });
    const nextValueState_ = isEmpty(nextValueState) ? undefined : nextValueState;
    setValueState(nextValueState_ ?? []);
    onChange?.(nextValueState_, { option, checked });
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <div className={classNames('AntCheckboxGroup__container', className)}>
      {items.map(item => {
        if (item.hidden) {
          return null;
        }

        const isChecked = valueState.includes(item.value);
        return (
          <Checkbox
            readOnly={item.readOnly || readOnly}
            disabled={item.disabled || disabled}
            key={item.value}
            checked={isChecked}
            onChange={checked => {
              return handleChange(item, checked);
            }}
            className={item.className}
          >
            {item.label}
          </Checkbox>
        );
      })}
    </div>
  );
};
