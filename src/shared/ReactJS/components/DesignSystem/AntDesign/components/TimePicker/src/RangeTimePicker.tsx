import { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { AntDatePicker, AntRangePickerProps } from '../../../base/AntDatePicker';
import './css/RangeTimePicker.css';
import { Format } from './types/Format';
import { detectTimeComponents } from './utils/detectTimeComponents';
import { Dayjs, dayjs } from '~/shared/Utilities';

export interface Props
  extends Pick<AntRangePickerProps, 'className' | 'allowClear' | 'disabled' | 'showNow' | 'suffixIcon' | 'locale'> {
  /** Function to specify the hours that should be disabled */
  disabledHours?: () => number[];
  /** Function to specify the minutes that should be disabled based on the selected hour */
  disabledMinutes?: (params: { hours: number }) => number[];
  /** Function to specify the seconds that should be disabled based on the selected hour and minute */
  disabledSeconds?: (params: { hours: number; minutes: number }) => number[];
  /** Format for displaying the date and time */
  format?: Format;
  /** Current value of the date range picker */
  value?: [Dayjs, Dayjs];
  /** Callback function triggered when the selected date range changes */
  onChange?: (value: [Dayjs, Dayjs] | undefined) => void;
  /** Preset ranges for quick selection. */
  presets?: Array<{ label: ReactNode; value: [Dayjs, Dayjs] }>;
  /** If true, the select is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the select is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The size of picker. */
  size?: SizeType;
  /** Placeholder text for the input. */
  placeholder?: [string, string];
}

/**
 * RangeTimePicker component extends the functionality of the Ant Design DatePicker component.
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
 * @param {Function} [props.disabledHours] - Function to specify the hours that should be disabled.
 * @param {Function} [props.disabledMinutes] - Function to specify the minutes that should be disabled.
 * @param {Function} [props.disabledSeconds] - Function to specify the seconds that should be disabled.
 * @param {Format} [props.format] - Format for displaying the date and time.
 * @param {[Dayjs, Dayjs]} [props.value] - Current value of the date range picker.
 * @param {Function} [props.onChange] - Callback function triggered when the selected date range changes.
 * @param {Object[]} [props.presets] - Preset ranges for quick selection.
 * @param {boolean} props.readOnly - If true, the select is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the select is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of picker.
 * @returns {JSX.Element} The rendered date range picker component.
 */
export const RangeTimePicker: FC<Props> = ({
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
  const [valueState, setValueState] = useState(
    value
      ? value.map(item => {
          return dayjs(item);
        })
      : undefined,
  );
  const isMounted = useIsMounted();

  const { hasHour, hasMinute, hasSecond } = useMemo(() => {
    return detectTimeComponents(format);
  }, [format]);

  const handleChange: Props['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const value_ = value?.map((item, index) => {
      let item_ = item;
      const isStart = index === 0;
      if (hasSecond) {
        item_ = isStart ? item?.startOf('second') : item?.endOf('second');
      } else if (hasMinute) {
        item_ = isStart ? item?.startOf('minute') : item?.endOf('minute');
      } else if (hasHour) {
        item_ = isStart ? item?.startOf('hour') : item?.endOf('hour');
      } else {
        item_ = isStart ? item?.startOf('day') : item?.endOf('day');
      }
      return item_;
    }) as [Dayjs, Dayjs] | undefined;

    const isUndefined = isEmpty(value_) || null;
    setValueState(isUndefined ? undefined : value_);
    onChange?.(isUndefined ? undefined : value_);
  };

  const handleFocus: AntRangePickerProps['onFocus'] = event => {
    if (readOnly) {
      event.target.blur();
    }
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(
        value
          ? value.map(item => {
              return dayjs(item);
            })
          : undefined,
      );
    }
  }, [value?.[0].valueOf(), value?.[1].valueOf()]);

  const mergedValueState: AntRangePickerProps['value'] = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    if (valueVariant === 'controlled-state') {
      return value
        ? (value.map(item => {
            return dayjs(item);
          }) as AntRangePickerProps['value'])
        : undefined;
    }
    return valueState as AntRangePickerProps['value'];
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntDatePicker.RangePicker
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
      popupClassName="AntRangeTimePicker__popup"
      className={classNames('AntRangeTimePicker__container', readOnly ? 'AntRangeTimePicker__readOnly' : '', className)}
      onFocus={handleFocus}
      value={mergedValueState}
      onChange={handleChange as unknown as AntRangePickerProps['onChange']}
    />
  );
};
