export interface DataSlice<SliceRawData> {
  /** A unique identifier for this specific data slice, used to differentiate slices within a dataset. */
  key: string;
  /**
   * The numeric value represented by this slice in the chart.
   * This value is typically what is visually displayed and compared in the chart.
   */
  data: number;
  /** The raw data associated with this specific slice. This can be any structure that represents the unprocessed data relevant to this slice. */
  rawData: SliceRawData;
  /** The style information used to render this slice */
  style: {
    /** The background color of the slice, typically used to fill the area representing the slice. */
    backgroundColor: string;
    /** The text color used for any labels or values displayed within the slice. */
    color: string;
    /**
     * The font family for any text rendered inside the slice.
     * If not provided, a default font family will be used.
     */
    fontFamily?: string;
    /**
     * The font size for any text rendered inside the slice.
     * If not provided, a default size will be used.
     */
    fontSize?: number;
    /**
     * The font weight for any text rendered inside the slice.
     * If not provided, a default weight will be used.
     */
    fontWeight?: number;
  };
}
