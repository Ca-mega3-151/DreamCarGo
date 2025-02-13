import { DataPoint } from './DataPoint';

export interface DataSet<Label extends string, DataSetRawData, PointRawData> {
  /** A unique identifier for this dataset, used for distinguishing between multiple datasets. */
  key: string;
  /** The raw data associated with the entire dataset. This can be any structure that represents the unprocessed data. */
  rawData: DataSetRawData;
  /**
   * A collection of data points within the dataset, organized by their respective labels.
   * Each label maps to a specific data point, allowing easy access to point-specific information.
   */
  points: Record<Label, DataPoint<PointRawData>>;
  /** The style information used to render this lines. */
  style: {
    /** The color of the line connecting the data points. */
    lineColor: string;
    /** The width of the line connecting the data points. */
    lineWidth?: number;
    /** The fill color for the area under the line. */
    areaColor?: string | Record<number, string>;
    /** The variant of the area fill, determining whether the fill starts from the baseline or ends at the line. */
    areaVariant?: 'start' | 'end';
  };
}
