import { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { AntDatePicker, AntDatePickerProps } from '../../../base/AntDatePicker';
import './css/SingleTimePicker.css';
import { Format } from './types/Format';
import { detectTimeComponents } from './utils/detectTimeComponents';
import { Dayjs, dayjs } from '~/shared/Utilities';

export interface Props
  extends Pick<
    AntDatePickerProps<Dayjs>,
    'className' | 'allowClear' | 'disabled' | 'showNow' | 'suffixIcon' | 'locale'
  > {
  /** A function that returns an array of disabled hours. */
  disabledHours?: () => number[];
  /**  A function that returns an array of disabled minutes based on the provided hour. */
  disabledMinutes?: (params: { hours: number }) => number[];
  /** A function that returns an array of disabled seconds based on the provided hour and minute. */
  disabledSeconds?: (params: { hours: number; minutes: number }) => number[];
  /** The format in which the date and/or time is displayed. */
  format?: Format;
  /** The currently selected date and time value. */
  value?: Dayjs | string | number;
  /** A function to handle changes to the selected date and time value. */
  onChange?: (value: Dayjs | undefined) => void;
  /** Preset ranges for quick selection. */
  presets?: Array<{ label: ReactNode; value: Dayjs }>;
  /** If true, the select is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the select is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The size of picker. */
  size?: SizeType;
  /** Placeholder text for the input. */
  placeholder?: string;
}

/**
 * SingleTimePicker component extends the functionality of the Ant Design DatePicker component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design DatePicker component.
 *
 * @param {Props} props - The properties for the RangeTimePicker component.
 * @param {string} [props.className] - Custom CSS class for the date picker.
 * @param {boolean} [props.allowClear] - Whether to show a clear button.
 * @param {string | [string, string]} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.disabled] - Whether the date picker is disabled.
 * @param {boolean} [props.showNow] - Whether to show the "Now" button.
 * @param {ReactNode} [props.suffixIcon] - Custom suffix icon for the date picker.
 * @param {Object} [props.locale] - Locale configuration for the date picker.
 * @param {() => number[]} [props.disabledHours] - Function to specify disabled hours.
 * @param {(params: { hours: number }) => number[]} [props.disabledMinutes] - Function to specify disabled minutes for a given hour.
 * @param {(params: { hours: number; minutes: number }) => number[]} [props.disabledSeconds] - Function to specify disabled seconds for a given hour and minute.
 * @param {Format} [props.format] - The format for displaying the date and/or time.
 * @param {Dayjs} [props.value] - The currently selected date and time.
 * @param {(value: Dayjs | undefined) => void} [props.onChange] - Callback for when the selected date and time changes.
 * @param {Array<{ label: ReactNode; value: Dayjs }>} props.presets - Preset ranges for quick selection.
 * @param {boolean} props.readOnly - If true, the select is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the select is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of picker.
 * @returns {JSX.Element} The rendered `SingleTimePicker` component.
 */
export const SingleTimePicker: FC<Props> = ({
  allowClear = true,
  className,
  disabled,
  placeholder,
  format = 'HH:mm',
  presets,
  showNow = true,
  suffixIcon,
  disabledHours = (): number[] => {
    return [];
  },
  disabledMinutes = (): number[] => {
    return [];
  },
  disabledSeconds = (): number[] => {
    return [];
  },
  locale,
  onChange,
  value,
  readOnly = false,
  valueVariant = 'controlled-state',
  size,
}: Props) => {
  const initializeContext = useInitializeContext();
  const [valueState, setValueState] = useState(value ? dayjs(value) : undefined);
  const isMounted = useIsMounted();

  const { hasHour, hasMinute, hasSecond } = useMemo(() => {
    return detectTimeComponents(format);
  }, [format]);

  const handleChange: Props['onChange'] = value => {
    if (readOnly) {
      return;
    }
    let value_ = value;
    if (hasSecond) {
      value_ = value?.startOf('second');
    } else if (hasMinute) {
      value_ = value?.startOf('minute');
    } else if (hasHour) {
      value_ = value?.startOf('hour');
    } else {
      value_ = value?.startOf('day');
    }

    const isUndefined = isEmpty(value_) || null;
    setValueState(isUndefined ? undefined : value_);
    onChange?.(isUndefined ? undefined : value_);
  };

  const handleFocus: AntDatePickerProps['onFocus'] = event => {
    if (readOnly) {
      event.target.blur();
    }
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value ? dayjs(value) : undefined);
    }
  }, [value?.valueOf()]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    if (valueVariant === 'controlled-state') {
      return value ? dayjs(value) : undefined;
    }
    return valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntDatePicker
      size={size}
      needConfirm
      picker="time"
      locale={locale}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      format={format}
      presets={presets}
      showNow={showNow}
      showTime={{
        showHour: hasHour,
        showMinute: hasMinute,
        showSecond: hasSecond,
        showMillisecond: false,
        disabledTime: () => {
          return {
            disabledHours,
            disabledMinutes: hours => {
              return disabledMinutes({ hours });
            },
            disabledSeconds: (hours, minutes) => {
              return disabledSeconds({ hours, minutes });
            },
          };
        },
      }}
      suffixIcon={suffixIcon}
      popupClassName="AntSingleTimePicker__popup"
      className={classNames(
        'AntSingleTimePicker__container',
        readOnly ? 'AntSingleTimePicker__readOnly' : '',
        className,
      )}
      onFocus={handleFocus}
      onChange={handleChange}
      value={mergedValueState}
    />
  );
};
