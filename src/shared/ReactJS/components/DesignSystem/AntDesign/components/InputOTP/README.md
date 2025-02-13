# Overview

The `InputOTP` component extends the functionality of the Ant Design OTP component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design OTP component.

# Props

| Prop         | Type                                         | Default              | Description                                                      |
| ------------ | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| className    | `string`                                     | -                    | Custom CSS class for styling the input field.                    |
| disabled     | `boolean`                                    | false                | Whether the input field is disabled.                             |
| value        | `string`                                     | -                    | The value of the input field.                                    |
| onChange     | `(value: string \| undefined) => void`       | -                    | Callback function triggered when the input value changes.        |
| length       | `number`                                     | -                    | The length of the OTP input.                                     |
| readOnly     | `boolean`                                    | `false`              | Whether the input otp is read-only.                              |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the input otp is controlled or uncontrolled state. |
| formatter    | `(value: string) => string`                  | -                    | A function for formatting the displayed value.                   |
| mask         | `boolean`                                    | -                    | Whether to mask the input characters.                            |
| size         | `string`                                     | -                    | The size of input.                                               |

# Usage

```jsx
import { InputOTP } from "path-to-InputOTP";

// Example usage
<InputOTP className="custom-input-otp" disabled={false} length={6} value="123456" onChange={(value) => console.log(value)} formatter={(value) => value.replace(/./g, "*")} mask />;
```
