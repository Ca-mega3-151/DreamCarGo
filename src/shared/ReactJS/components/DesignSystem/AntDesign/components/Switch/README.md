# Overview

The `Switch` component extends the functionality of the Ant Design Switch component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Switch component.

# Props

| Prop              | Type                                         | Default              | Description                                                   |
| ----------------- | -------------------------------------------- | -------------------- | ------------------------------------------------------------- |
| checked           | `boolean`                                    | -                    | The initial checked state of the switch.                      |
| readOnly          | `boolean`                                    | `false`              | Whether the switch is read only.                              |
| valueVariant      | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the switch is controlled or uncontrolled state. |
| checkedChildren   | `React.ReactNode`                            | -                    | The content to be rendered when the switch is checked.        |
| className         | `string`                                     | -                    | Custom CSS class for styling the switch.                      |
| disabled          | `boolean`                                    | `false`              | Whether the switch is disabled.                               |
| loading           | `boolean`                                    | -                    | Whether to display loading state of switch.                   |
| onChange          | `(value: boolean) => void`                   | -                    | Callback function triggered when the switch state changes.    |
| unCheckedChildren | `React.ReactNode`                            | -                    | The content to be rendered when the switch is unchecked.      |

# Usage

```jsx
import { Switch } from "path-to-Switch";

// Example usage
<Switch checked={true} checkedChildren="Enabled" unCheckedChildren="Disabled" className="custom-switch" disabled={false} loading={false} onChange={(value) => console.log("Switch state changed:", value)} />;
```
