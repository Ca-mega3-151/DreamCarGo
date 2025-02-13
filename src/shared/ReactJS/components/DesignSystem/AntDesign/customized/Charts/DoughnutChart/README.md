# Overview

The `DoughnutChart` component is a flexible and customizable charting tool that visualizes data as a doughnut chart. Each slice of the doughnut represents a portion of the dataset, allowing users to compare proportions easily. The component supports interactive features such as click and hover events, as well as customizable tooltips and formatting options.

# Props

| Prop           | Type                                                                                                                     | Description                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `labels`       | `Label[]`                                                                                                                | An array of labels representing each slice of the doughnut chart.                                                                                                                                     |
| `formatter`    | `(value: number) => string` \| `undefined`                                                                               | A function to format the data slice displayed on each slice.                                                                                                                                          |
| `onClickSlice` | `(params: CallbackParams<Label, DataSetRawData, SliceRawData>) => void` \| `undefined`                                   | A callback function triggered when a data slice is clicked.                                                                                                                                           |
| `onHoverSlice` | `(params: CallbackParams<Label, DataSetRawData, SliceRawData>) => void` \| `undefined`                                   | A callback function triggered when a data slice is hovered over.                                                                                                                                      |
| `datasets`     | `DataSet<Label, DataSetRawData, SliceRawData>[]`                                                                         | An array of datasets to be visualized in the doughnut chart. Each dataset contains multiple data slices.                                                                                              |
| `tooltip`      | `{ render?: (props: CallbackParams<Label, DataSetRawData, SliceRawData>) => ReactNode, enabled?: boolean } \| undefined` | An object to customize the tooltip displayed when hovering over a slice. Includes an optional `render` function to define custom content and an `enabled` boolean to toggle the tooltip's visibility. |
| `className`    | `string` \| `undefined`                                                                                                  | An optional CSS class name to apply custom styles to the chart container.                                                                                                                             |
| `content`      | `ReactNode` \| `() => ReactNode`                                                                                         | The content to be displayed inside the doughnut chart.                                                                                                                                                |

# Usage Example

```tsx
import { DoughnutChart } from "./DoughnutChart";

const MyComponent = () => {
  const labels = ["Category A", "Category B", "Category C"];
  const datasets = [
    {
      key: "dataset1",
      rawData: {},
      slices: {
        "Category A": { key: "slice1", data: 40, rawData: {}, style: { backgroundColor: "#f00", color: "#fff" } },
        "Category B": { key: "slice2", data: 30, rawData: {}, style: { backgroundColor: "#0f0", color: "#000" } },
        "Category C": { key: "slice3", data: 30, rawData: {}, style: { backgroundColor: "#00f", color: "#fff" } },
      },
    },
  ];

  return <DoughnutChart labels={labels} datasets={datasets} />;
};
```
