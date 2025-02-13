# Overview

The `Textarea` component extends the functionality of the Ant Design Textarea component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Textarea component.

# Props

| Prop             | Type                                         | Default              | Description                                                                                        |
| ---------------- | -------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| className        | `string`                                     | -                    | Custom CSS class for styling the text area.                                                        |
| disabled         | `boolean`                                    | `false`              | Whether the text area is disabled.                                                                 |
| maxLength        | `number`                                     | -                    | The maximum length of the input.                                                                   |
| placeholder      | `string`                                     | -                    | Placeholder text for the text area.                                                                |
| prefix           | `ReactNode`                                  | -                    | Prefix element for the text area.                                                                  |
| showCount        | `boolean`                                    | -                    | Whether to display the character count.                                                            |
| rows             | `number`                                     | `6`                  | Number of rows in the text area.                                                                   |
| readOnly         | `boolean`                                    | `false`              | Whether the text area is read-only.                                                                |
| value            | `string`                                     | -                    | The value of the text area.                                                                        |
| onChange         | `(value: string \| undefined) => void`       | -                    | Callback function triggered when the text area value changes.                                      |
| onDebounceChange | `(value: string \| undefined) => void`       | -                    | Callback function that is triggered when the input value changes, but only after a debounce delay. |
| valueVariant     | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the input is controlled or uncontrolled state.                                       |

# Usage

```jsx
import { Textarea } from "path-to-Textarea";

// Example usage
<Textarea className="custom-textarea" disabled={false} maxLength={200} placeholder="Enter your text here..." prefix={<span>#</span>} showCount={true} rows={4} value="Initial text" onChange={(value) => console.log(value)} />;
```
