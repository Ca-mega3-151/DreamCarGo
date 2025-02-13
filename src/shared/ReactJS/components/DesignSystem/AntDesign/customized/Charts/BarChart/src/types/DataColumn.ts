export interface DataColumn<ColumnRawData> {
  /** A unique identifier for this specific data column, used to differentiate columns within a dataset. */
  key: string;
  /**
   * The numeric value represented by this column in the chart.
   * This value is typically what is visually displayed and compared in the chart.
   */
  data: number;
  /** The raw data associated with this specific column. This can be any structure that represents the unprocessed data relevant to this column. */
  rawData: ColumnRawData;
  /** The style information used to render this column. */
  style: {
    /** The text color used for any labels or values displayed within the column. */
    color: string;
    /**
     * The font family for any text rendered inside the column.
     * If not provided, a default font family will be used.
     */
    fontFamily?: string;
    /**
     * The font size for any text rendered inside the column.
     * If not provided, a default size will be used.
     */
    fontSize?: number;
    /**
     * The font weight for any text rendered inside the column.
     * If not provided, a default weight will be used.
     */
    fontWeight?: number;
  };
}
