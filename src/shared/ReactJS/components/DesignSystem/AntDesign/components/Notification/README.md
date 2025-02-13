# Overview

The `Notification` component extends the functionality of the Ant Design notification component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design notification component.

# Props

| Prop      | Type      | Default | Description                                            |
| --------- | --------- | ------- | ------------------------------------------------------ |
| duration  | `number`  | -       | Duration for which the notification will be displayed. |
| placement | `string`  | -       | Placement of the notification on the screen.           |
| variant   | `Variant` | 'bold'  | Variant style of the notification.                     |

# Usage

```jsx
import { Notification } from "path-to-Notification";

// Setup instance
<Notification duration={3000} placement="topRight" variant="outlined" />;

// Call function
notification.success({
  message: "Alert header",
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum reiciendis minima tempora sed accusamus autem.",
});
```
