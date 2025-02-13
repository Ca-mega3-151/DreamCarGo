import { DataSlice } from './DataSlice';

export interface DataSet<Label extends string, DataSetRawData, SliceRawData> {
  /** A unique identifier for this dataset, used for distinguishing between multiple datasets. */
  key: string;
  /** The raw data associated with the entire dataset. This can be any structure that represents the unprocessed data. */
  rawData: DataSetRawData;
  /**
   * A collection of data slices within the dataset, organized by their respective labels.
   * Each label maps to a specific data slice, allowing easy access to slice-specific information.
   */
  slices: Record<Label, DataSlice<SliceRawData>>;
}
