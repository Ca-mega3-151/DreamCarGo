# Overview

The `Divider` component extends the functionality of the Ant Design Divider component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Divider component.

# Props

| Prop              | Type               | Default | Description                                                                         |
| ----------------- | ------------------ | ------- | ----------------------------------------------------------------------------------- |
| className         | `string`           | -       | Custom CSS class for styling the divider.                                           |
| orientation       | `string`           | -       | The position of the text inside the divider, could be 'left', 'right', or 'center'. |
| orientationMargin | `string \| number` | -       | The margin of the text inside the divider.                                          |
| dashed            | `boolean`          | false   | Whether the divider is dashed.                                                      |
| type              | `string`           | -       | The type of divider, could be 'horizontal' or 'vertical'.                           |
| children          | `ReactNode`        | -       | Content to be displayed inside the divider.                                         |

# Usage

```jsx
import { Divider } from "path-to-Divider";

// Example usage
<Divider
  className="custom-divider"
  orientation="left"
  orientationMargin="10px"
  dashed
>
  Left Text
</Divider>

<Divider
  className="custom-divider"
  type="vertical"
  dashed
/>
```
