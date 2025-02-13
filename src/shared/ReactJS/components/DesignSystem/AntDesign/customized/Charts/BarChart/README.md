# Overview

The `BarChart` component is a flexible and customizable charting tool that allows you to visualize data as either a vertical or horizontal bar chart. The component supports both stacked and unstacked bar charts, with interactive features such as click and hover events, customizable tooltips, and formatting options for the displayed values.

# Props

| Prop            | Type                                                                                                                      | Default      | Description                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `labels`        | `Label[]`                                                                                                                 | -            | An array of labels representing each bar or group of bars in the chart.                           |
| `formatter`     | `(value: number) => string` \| `undefined`                                                                                | -            | A function to format the data column displayed on each bar.                                       |
| `onClickColumn` | `(params: CallbackParams<Label, DataSetRawData, ColumnRawData>) => void` \| `undefined`                                   | -            | A callback function triggered when a bar is clicked.                                              |
| `onHoverColumn` | `(params: CallbackParams<Label, DataSetRawData, ColumnRawData>) => void` \| `undefined`                                   | -            | A callback function triggered when a bar is hovered over.                                         |
| `datasets`      | `DataSet<Label, DataSetRawData, ColumnRawData>[]`                                                                         | -            | An array of datasets to be visualized in the bar chart. Each dataset contains multiple bars.      |
| `tooltip`       | `{ render?: (props: CallbackParams<Label, DataSetRawData, ColumnRawData>) => ReactNode, enabled?: boolean } \| undefined` | -            | An object to customize the tooltip displayed when hovering over a column.                         |
| `className`     | `string` \| `undefined`                                                                                                   | -            | An optional CSS class name to apply custom styles to the chart container.                         |
| `stacked`       | `boolean` \| `undefined`                                                                                                  | `false`      | If `true`, the bars in the chart will be stacked on top of each other.                            |
| `variant`       | `'vertical'` \| `'horizontal'` \| `undefined`                                                                             | `'vertical'` | Determines the orientation of the bars in the chart. Can be 'vertical' (default) or 'horizontal'. |

# Examples

```tsx
import { BarChart } from "./BarChart";

const MyComponent = () => {
  const labels = ["Q1", "Q2", "Q3", "Q4"];
  const datasets = [
    {
      key: "dataset1",
      rawData: {},
      columns: {
        Q1: { key: "column1", data: 10, rawData: {}, style: { backgroundColor: "#FF6384", color: "#fff" } },
        Q2: { key: "column2", data: 20, rawData: {}, style: { backgroundColor: "#36A2EB", color: "#000" } },
        Q3: { key: "column3", data: 30, rawData: {}, style: { backgroundColor: "#FFCE56", color: "#000" } },
        Q4: { key: "column4", data: 40, rawData: {}, style: { backgroundColor: "#4BC0C0", color: "#fff" } },
      },
    },
  ];

  return <BarChart labels={labels} datasets={datasets} />;
};
```
