export interface DataPoint<PointRawData> {
  /** A unique identifier for this specific data point, used to differentiate points within a dataset. */
  key: string;
  /**
   * The numeric value represented by this point in the chart.
   * This value is typically what is visually displayed and compared in the chart.
   */
  data: number;
  /** The raw data associated with this specific point. This can be any structure that represents the unprocessed data relevant to this point. */
  rawData: PointRawData;
}
