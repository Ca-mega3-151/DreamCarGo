import { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { AntDatePicker, AntDatePickerProps } from '../../../base/AntDatePicker';
import './css/SingleMonthPicker.css';
import { Format } from './types/Format';
import { Dayjs, dayjs } from '~/shared/Utilities';

export interface Props
  extends Pick<AntDatePickerProps, 'className' | 'allowClear' | 'disabled' | 'showNow' | 'suffixIcon' | 'locale'> {
  /** Function to specify the months that should be disabled */
  disabledDate?: (date: Dayjs) => boolean;
  /** Preset ranges for quick selection. */
  presets?: Array<{ label: ReactNode; value: Dayjs }>;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** The format in which the month and/or time is displayed. */
  format?: Format;
  /** The currently selected date and time value. */
  value?: Dayjs | string | number;
  /** A function to handle changes to the selected date and time value. */
  onChange?: (value: Dayjs | undefined) => void;
  /** If true, the picker is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the picker is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The size of picker. */
  size?: SizeType;
}

/**
 * SingleMonthPicker component extends the functionality of the Ant Design DatePicker component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design DatePicker component.
 *
 * @param {Props} props - The properties for the RangeMonthPicker component.
 * @param {string} [props.className] - Custom CSS class for the month picker.
 * @param {boolean} [props.allowClear] - Whether to show a clear button.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.disabled] - Whether the month picker is disabled.
 * @param {Object[]} [props.presets] - Preset ranges for quick selection.
 * @param {boolean} [props.showNow] - Whether to show the "Now" button.
 * @param {Function} [props.disabledDate] - Function to specify the months that should be disabled.
 * @param {ReactNode} [props.suffixIcon] - Custom suffix icon for the month picker.
 * @param {Object} [props.locale] - Locale configuration for the month picker.
 * @param {Format} [props.format] - Format for displaying the month and time.
 * @param {[Dayjs, Dayjs]} [props.value] - Current value of the month range picker.
 * @param {Function} [props.onChange] - Callback function triggered when the selected date range changes.
 * @param {boolean} [props.readOnly] - If true, the picker is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the picker is controlled or uncontrolled state.
 * @param {string} [props.size] - The size of picker.
 * @returns {JSX.Element} The rendered `SingleMonthPicker` component.
 */
export const SingleMonthPicker: FC<Props> = ({
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
  const [valueState, setValueState] = useState(value ? dayjs(value) : undefined);
  const isMounted = useIsMounted();

  const handleChange: Props['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : value?.startOf('month');

    setValueState(value_);
    onChange?.(value_);
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

  const mergedValueState: Dayjs | undefined = useDeepCompareMemo(() => {
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
      popupClassName="AntSingleMonthPicker__popup"
      className={classNames(
        'AntSingleMonthPicker__container',
        readOnly ? 'AntSingleMonthPicker__readOnly' : '',
        className,
      )}
      onChange={handleChange}
      value={mergedValueState}
    />
  );
};
