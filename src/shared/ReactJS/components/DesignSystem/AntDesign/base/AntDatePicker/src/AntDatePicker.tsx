import { DatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';
import { BaseRangePickerProps } from 'rc-picker/lib/PickerInput/RangePicker';
import { generateConfig } from './generateConfig';

export const AntDatePicker = DatePicker.generatePicker<Dayjs>(generateConfig);

export type AntRangePickerProps = Omit<BaseRangePickerProps<Dayjs>, 'locale'> & {
  locale?: RangePickerProps['locale'];
};
export type { AntDatePickerProps };
