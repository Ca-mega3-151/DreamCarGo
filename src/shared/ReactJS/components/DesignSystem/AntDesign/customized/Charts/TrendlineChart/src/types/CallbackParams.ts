import { DataPoint } from './DataPoint';
import { DataSet } from './DataSet';

export interface CallbackParams<Label extends string, DataSetRawData, PointRawData> {
  /**
   * The dataset that contains the point interacting with the chart.
   * This provides context on which dataset the specific point belongs to.
   */
  dataset: DataSet<Label, DataSetRawData, PointRawData>;
  /**
   * The data point that is being interacted with, such as being clicked or hovered over.
   * This contains the specific data and style information for the point.
   */
  dataPoint: DataPoint<PointRawData>;
  /** The label corresponding to the data point. This label is used to identify the point within the dataset. */
  label: Label;
}
