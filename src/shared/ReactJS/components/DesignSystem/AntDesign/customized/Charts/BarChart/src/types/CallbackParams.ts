import { DataColumn } from './DataColumn';
import { DataSet } from './DataSet';

export interface CallbackParams<Label extends string, DataSetRawData, ColumnRawData> {
  /**
   * The dataset that contains the column interacting with the chart.
   * This provides context on which dataset the specific column belongs to.
   */
  dataset: DataSet<Label, DataSetRawData, ColumnRawData>;
  /**
   * The data column that is being interacted with, such as being clicked or hovered over.
   * This contains the specific data and style information for the column.
   */
  dataColumn: DataColumn<ColumnRawData>;
  /** The label corresponding to the data column. This label is used to identify the column within the dataset. */
  label: Label;
}
