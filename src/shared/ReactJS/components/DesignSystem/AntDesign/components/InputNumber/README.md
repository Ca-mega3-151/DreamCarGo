# Overview

The `InputNumber` component extends the functionality of the Ant Design InputNumber component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Input component.

# Props

| Prop         | Type                                         | Default              | Description                                                         |
| ------------ | -------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| addonAfter   | `ReactNode`                                  | -                    | The element to display on the right side of the input number field. |
| addonBefore  | `ReactNode`                                  | -                    | The element to display on the left side of the input number field.  |
| className    | `string`                                     | -                    | Custom CSS class for styling the input number.                      |
| controls     | `boolean`                                    | `true`               | Whether to show the controls.                                       |
| disabled     | `boolean`                                    | -                    | Whether the input number is disabled.                               |
| formatter    | `(value?: number) => string`                 | -                    | Specifies the format of the value presented.                        |
| max          | `number`                                     | -                    | The maximum value of the input number.                              |
| min          | `number`                                     | 0                    | The minimum value of the input number.                              |
| parser       | `(value?: string) => number`                 | -                    | Specifies the value extracted from the formatted value.             |
| placeholder  | `string`                                     | -                    | The placeholder text for the input number.                          |
| prefix       | `ReactNode`                                  | -                    | The prefix icon or text for the input number.                       |
| step         | `number`                                     | -                    | The step size for the input number.                                 |
| suffix       | `ReactNode`                                  | -                    | The suffix icon or text for the input number.                       |
| readOnly     | `boolean`                                    | `false`              | Whether the input number is read-only.                              |
| value        | `number`                                     | -                    | The value of the input number.                                      |
| onChange     | `(value?: number) => void`                   | -                    | Callback function triggered when the input number value changes.    |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the input number is controlled or uncontrolled state. |
| size         | `string`                                     | -                    | The size of input.                                                  |

# Usage

```jsx
import { InputNumber } from "path-to-InputNumber";

// Example usage
<InputNumber className="custom-input-number" prefix={<Icon type="dollar" />} suffix={<Icon type="percent" />} controls disabled={false} max={100} min={0} step={1} value={50} onChange={(value) => console.log(value)} />;
```
