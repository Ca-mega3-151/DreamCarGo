# Overview

The `Rate` component extends the functionality of the Ant Design Rate component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Rate component.

# Props

| Prop         | Type                                         | Default              | Description                                                       |
| ------------ | -------------------------------------------- | -------------------- | ----------------------------------------------------------------- |
| className    | `string`                                     | -                    | Custom CSS class for styling the rate component.                  |
| allowClear   | `boolean`                                    | `true`               | Allow clearing the rate value.                                    |
| allowHalf    | `boolean`                                    | `false`              | Allow selecting half stars.                                       |
| count        | `number`                                     | `5`                  | Number of rate items.                                             |
| character    | `ReactNode`                                  | -                    | Custom character to be used for each rate item.                   |
| disabled     | `boolean`                                    | `false`              | Disabled state of the rate component.                             |
| tooltips     | `Array<string>`                              | -                    | Array of tooltips to be shown on hover for each rate item.        |
| value        | `number`                                     | -                    | The current rate value.                                           |
| onChange     | `(value: number \| undefined) => void`       | -                    | Callback function when the rate value changes.                    |
| readOnly     | `boolean`                                    | `false`              | If true, the rate is read-only and cannot be changed by the user. |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the rate is controlled or uncontrolled state.       |

# Usage

```jsx
import { Rate } from "path-to-Rate";

// Example usage
<Rate className="custom-class" allowClear allowHalf count={10} character={<IconComponent />} disabled tooltips={["Terrible", "Bad", "Normal", "Good", "Wonderful"]} value={3} onChange={(value) => console.log("Rate value changed:", value)} readOnly valueVariant="controlled-state" />;
```
