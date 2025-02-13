# Overview

The `InputPassword` component extends the functionality of the Ant Design Password component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Password component.

# Props

| Prop            | Type                                         | Default              | Description                                                           |
| --------------- | -------------------------------------------- | -------------------- | --------------------------------------------------------------------- |
| addonAfter      | `ReactNode`                                  | -                    | The element to display on the right side of the input field.          |
| addonBefore     | `ReactNode`                                  | -                    | The element to display on the left side of the input field.           |
| allowClear      | `boolean`                                    | `true`               | Whether to allow clear the input field.                               |
| className       | `string`                                     | -                    | Custom CSS class for styling the input field.                         |
| disabled        | `boolean`                                    | `false`              | Whether the input field is disabled.                                  |
| maxLength       | `number`                                     | -                    | The maximum length of the input value.                                |
| placeholder     | `string`                                     | -                    | The placeholder text for the input field.                             |
| prefix          | `ReactNode`                                  | -                    | The prefix icon or text for the input field.                          |
| readOnly        | `boolean`                                    | `false`              | Whether the input is read-only.                                       |
| value           | `string`                                     | -                    | The value of the input field.                                         |
| onChange        | `(value: string \| undefined) => void`       | -                    | Callback function triggered when the input value changes.             |
| iconRender      | `(visible: boolean) => ReactNode`            | -                    | Custom icon render function for the visibility toggle button.         |
| visible         | `boolean`                                    | -                    | Whether the password is shown or hidden.                              |
| onVisibleChange | `(visible: boolean) => void`                 | -                    | Callback executed when the visibility of the password is changed.     |
| valueVariant    | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the input password is controlled or uncontrolled state. |
| size            | `string`                                     | -                    | The size of input.                                                    |

# Usage

```jsx
import { InputPassword } from "path-to-InputPassword";

// Example usage
<InputPassword className="custom-input-password" prefix={<Icon type="lock" />} suffix={<Icon type="eye" />} allowClear disabled={false} maxLength={20} value="password123" onChange={(value) => console.log(value)} iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} visible={true} onVisibleChange={(visible) => console.log(visible)} />;
```
