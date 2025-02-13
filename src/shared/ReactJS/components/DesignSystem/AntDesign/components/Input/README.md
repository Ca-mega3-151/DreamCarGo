# Overview

The `Input` component extends the functionality of the Ant Design Input component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Input component.

# Props

| Prop             | Type                                         | Default              | Description                                                                                        |
| ---------------- | -------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| addonAfter       | `ReactNode`                                  | -                    | The element to display on the right side of the input field.                                       |
| addonBefore      | `ReactNode`                                  | -                    | The element to display on the left side of the input field.                                        |
| allowClear       | `boolean`                                    | `true`               | Whether a clear button is displayed when there is input.                                           |
| className        | `string`                                     | -                    | Custom CSS class for styling the input.                                                            |
| disabled         | `boolean`                                    | `false`              | Whether the input is disabled.                                                                     |
| maxLength        | `number`                                     | -                    | The maximum length of the input value.                                                             |
| placeholder      | `string`                                     | -                    | The placeholder text for the input.                                                                |
| prefix           | `ReactNode`                                  | -                    | The prefix icon or text for the input.                                                             |
| suffix           | `ReactNode`                                  | -                    | The suffix icon or text for the input.                                                             |
| readOnly         | `boolean`                                    | `false`              | Whether the input is read-only.                                                                    |
| value            | `string`                                     | -                    | The value of the input.                                                                            |
| onChange         | `(value: string \| undefined) => void`       | -                    | Callback function triggered when the input value changes.                                          |
| onDebounceChange | `(value: string \| undefined) => void`       | -                    | Callback function that is triggered when the input value changes, but only after a debounce delay. |
| valueVariant     | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the input is controlled or uncontrolled state.                                       |
| size             | `string`                                     | -                    | The size of input.                                                                                 |
| showCount        | `boolean`                                    | -                    | Whether to display the character count.                                                            |
| mode             | `Mode`                                       | -                    | Specifies the mode of the input, determining what type of characters it accepts.                   |

# Usage

```jsx
import { Input } from "path-to-Input";

// Example usage
<Input className="custom-input" prefix={<Icon type="user" />} suffix={<Icon type="search" />} allowClear disabled={false} maxLength={50} value="" onChange={(value) => console.log(value)} />;
```
