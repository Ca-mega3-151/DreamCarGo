import { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { AntDatePicker, AntRangePickerProps } from '../../../base/AntDatePicker';
import './css/RangeMonthPicker.css';
import { Format } from './types/Format';
import { Dayjs, dayjs } from '~/shared/Utilities';

export interface Props
  extends Pick<AntRangePickerProps, 'className' | 'allowClear' | 'disabled' | 'showNow' | 'suffixIcon' | 'locale'> {
  /** Function to specify the months that should be disabled */
  disabledDate?: (date: Dayjs) => boolean;
  /** Preset ranges for quick selection. */
  presets?: Array<{ label: ReactNode; value: [Dayjs, Dayjs] }>;
  /** Placeholder text for the input. */
  placeholder?: [string, string];
  /** Format for displaying the month */
  format?: Format;
  /** Current value of the month range picker */
  value?: [Dayjs | string | number, Dayjs | string | number];
  /** Callback function triggered when the selected date range changes */
  onChange?: (value: [Dayjs, Dayjs] | undefined) => void;
  /** If true, the picker is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the picker is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The size of picker. */
  size?: SizeType;
}

/**
 * RangeMonthPicker component extends the functionality of the Ant Design DatePicker component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design DatePicker component.
 *
 * @param {Props} props - The properties for the RangeMonthPicker component.
 * @param {string} [props.className] - Custom CSS class for the month picker.
 * @param {boolean} [props.allowClear] - Whether to show a clear button.
 * @param {[string, string]} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.disabled] - Whether the month picker is disabled.
 * @param {Object[]} [props.presets] - Preset ranges for quick selection.
 * @param {boolean} [props.showNow] - Whether to show the "Now" button.
 * @param {Function} [props.disabledDate] - Function to specify the months that should be disabled.
 * @param {ReactNode} [props.suffixIcon] - Custom suffix icon for the month picker.
 * @param {Object} [props.locale] - Locale configuration for the month picker.
 * @param {Format} [props.format] - Format for displaying the month.
 * @param {[Dayjs, Dayjs]} [props.value] - Current value of the month range picker.
 * @param {Function} [props.onChange] - Callback function triggered when the selected date range changes.
 * @param {boolean} [props.readOnly] - If true, the picker is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the picker is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of picker.
 * @returns {JSX.Element} The rendered date range picker component.
 */
export const RangeMonthPicker: FC<Props> = ({
  allowClear = true,
  className,
  disabled,
  placeholder,
  format = 'MM/YYYY',
  presets,
  showNow = true,
  suffixIcon,
  disabledDate,
  locale,
  onChange = (): void => {
    return undefined;
  },
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

  const handleChange: Props['onChange'] = value => {
    if (readOnly) {
      return;
    }

    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined
      ? undefined
      : (value?.map((item, index) => {
          const isStart = index === 0;
          const item_ = isStart ? item?.startOf('month') : item?.endOf('month');
          return item_;
        }) as [Dayjs, Dayjs] | undefined);

    setValueState(value_);
    onChange?.(value_);
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
      onFocus={handleFocus}
      needConfirm
      picker="date"
      locale={locale}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      format={format}
      presets={presets}
      showNow={showNow}
      showTime={false}
      disabledDate={disabledDate}
      suffixIcon={suffixIcon}
      popupClassName="AntRangeMonthPicker__popup"
      className={classNames(
        'AntRangeMonthPicker__container',
        readOnly ? 'AntRangeMonthPicker__readOnly' : '',
        className,
      )}
      onChange={handleChange as AntRangePickerProps['onChange']}
      value={mergedValueState}
    />
  );
};
