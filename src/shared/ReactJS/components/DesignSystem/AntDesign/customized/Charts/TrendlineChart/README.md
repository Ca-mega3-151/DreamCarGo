# Overview

The `TrendlineChart` component is a flexible and customizable charting tool that visualizes data as a line chart. Each point of the line represents a portion of the dataset, allowing users to compare proportions easily.

# Props

| Prop        | Type                                             | Description                                                                                          |
| ----------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `labels`    | `Label[]`                                        | An array of labels representing each point of the line chart.                                        |
| `datasets`  | `DataSet<Label, DataSetRawData, PointRawData>[]` | An array of datasets to be visualized in the line chart. Each dataset contains multiple data points. |
| `className` | `string` \| `undefined`                          | An optional CSS class name to apply custom styles to the chart container.                            |

# Examples

```tsx
import { TrendlineChart } from "./TrendlineChart";

const MyComponent = () => {
  const labels = ["Category A", "Category B", "Category C"];
  const datasets = [
    {
      key: "dataset1",
      rawData: {},
      points: {
        "Category A": { key: "point1", data: 40, rawData: {}, style: { backgroundColor: "#f00", color: "#fff" } },
        "Category B": { key: "point2", data: 30, rawData: {}, style: { backgroundColor: "#0f0", color: "#000" } },
        "Category C": { key: "point3", data: 30, rawData: {}, style: { backgroundColor: "#00f", color: "#fff" } },
      },
    },
  ];

  return <TrendlineChart labels={labels} datasets={datasets} />;
};
```
