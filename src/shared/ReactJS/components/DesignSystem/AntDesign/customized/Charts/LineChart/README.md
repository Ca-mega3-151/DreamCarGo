# Overview

The `LineChart` component is a flexible and customizable charting tool that visualizes data as a line chart. Each point of the line represents a portion of the dataset, allowing users to compare proportions easily. The component supports interactive features such as click and hover events, as well as customizable tooltips and formatting options.

# Props

| Prop           | Type                                                                                                                     | Description                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `labels`       | `Label[]`                                                                                                                | An array of labels representing each point of the line chart.                                        |
| `onClickPoint` | `(params: CallbackParams<Label, DataSetRawData, PointRawData>) => void` \| `undefined`                                   | A callback function triggered when a data point is clicked.                                          |
| `onHoverPoint` | `(params: CallbackParams<Label, DataSetRawData, PointRawData>) => void` \| `undefined`                                   | A callback function triggered when a data point is hovered over.                                     |
| `datasets`     | `DataSet<Label, DataSetRawData, PointRawData>[]`                                                                         | An array of datasets to be visualized in the line chart. Each dataset contains multiple data points. |
| `tooltip`      | `{ render?: (props: CallbackParams<Label, DataSetRawData, PointRawData>) => ReactNode, enabled?: boolean } \| undefined` | An object to customize the tooltip displayed when hovering over a point.                             |
| `className`    | `string` \| `undefined`                                                                                                  | An optional CSS class name to apply custom styles to the chart container.                            |

# Examples

```tsx
import { LineChart } from "./LineChart";

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

  return <LineChart labels={labels} datasets={datasets} />;
};
```
