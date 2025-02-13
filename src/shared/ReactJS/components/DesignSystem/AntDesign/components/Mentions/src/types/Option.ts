import { DefaultOptionType } from 'antd/es/select';

export interface Option<RawData = any> {
  /** The value of the option. */
  value: string;
  /** The label to display for the option. */
  label: DefaultOptionType['label'];
  /** Whether the option is disabled. */
  disabled?: DefaultOptionType['disabled'];
  /** The search value associated with the option, used for filtering. */
  searchValue: string;
  /** Whether the option is hidden. */
  hidden?: boolean;
  /** The raw data associated with the option. */
  rawData: RawData;
}
