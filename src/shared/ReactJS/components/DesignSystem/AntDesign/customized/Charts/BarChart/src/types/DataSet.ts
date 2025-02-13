import { DataColumn } from './DataColumn';

export interface DataSet<Label extends string, DataSetRawData, ColumnRawData> {
  /** A unique identifier for this dataset, used for distinguishing between multiple datasets. */
  key: string;
  /** The raw data associated with the entire dataset. This can be any structure that represents the unprocessed data. */
  rawData: DataSetRawData;
  /**
   * A collection of data columns within the dataset, organized by their respective labels.
   * Each label maps to a specific data column, allowing easy access to column-specific information.
   */
  columns: Record<Label, DataColumn<ColumnRawData>>;
  /** The style information used to render this columns. */
  style: {
    /** The background color of the columns. */
    backgroundColor: string;
  };
}
