import { DataSet } from './DataSet';
import { DataSlice } from './DataSlice';

export interface CallbackParams<Label extends string, DataSetRawData, SliceRawData> {
  /**
   * The dataset that contains the slice interacting with the chart.
   * This provides context on which dataset the specific slice belongs to.
   */
  dataset: DataSet<Label, DataSetRawData, SliceRawData>;
  /**
   * The data slice that is being interacted with, such as being clicked or hovered over.
   * This contains the specific data and style information for the slice.
   */
  dataSlice: DataSlice<SliceRawData>;
  /** The label corresponding to the data slice. This label is used to identify the slice within the dataset. */
  label: Label;
}
