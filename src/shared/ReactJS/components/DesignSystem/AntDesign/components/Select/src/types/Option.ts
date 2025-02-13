import { DefaultOptionType } from 'antd/es/select';
import { ReactNode } from 'react';
import { OptionValueType } from './OptionValueType';

export interface Option<ValueType extends OptionValueType, RawData = any> {
  /** The value of the option. */
  value: ValueType;
  /** The label to display for the option. */
  label: DefaultOptionType['label'];
  /** Whether the option is disabled. */
  disabled?: DefaultOptionType['disabled'];
  /** Custom render label selected of ant select. If set, "optionLabelProp" will be "displayLabel". */
  displayLabel?: ReactNode;
  /** The search value associated with the option, used for filtering. */
  searchValue?: string;
  /** Whether the option is hidden. */
  hidden?: boolean;
  /** The raw data associated with the option. */
  rawData: RawData;
}
