# Overview

The `Popover` component extends the functionality of the Ant Design Popover component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Popover component.

# Props

| Prop              | Type                                         | Default                | Description                                                                         |
| ----------------- | -------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| className         | string                                       | -                      | Custom CSS class for styling the popover.                                           |
| arrow             | boolean                                      | true                   | Whether to display an arrow pointing to the reference element.                      |
| children          | ReactNode                                    | -                      | The trigger of the popover.                                                         |
| color             | string                                       | -                      | The color of the popover.                                                           |
| content           | string/ReactNode                             | -                      | The content of the popover.                                                         |
| trigger           | string                                       | -                      | The trigger mode which can be 'hover', 'focus', 'click', or 'contextMenu'.          |
| overlayClassName  | string                                       | -                      | Custom CSS class for the overlay.                                                   |
| disabled          | boolean                                      | false                  | Whether the popover is disabled.                                                    |
| open              | `boolean`                                    | -                      | Whether the popover is visible, in controlled mode.                                 |
| onOpenChange      | `function`                                   | -                      | Callback when the open state changes.                                               |
| openVariant       | `'controlled-state' \| 'uncontrolled-state'` | `'uncontrolled-state'` | Determines whether the popover's open state is controlled externally or internally. |
| getPopupContainer | `function`                                   | -                      | Function to determine the container in which the popover is rendered.               |
| placement         | `string`                                     | -                      | The position of the popover relative to the target.                                 |

# Usage

```jsx
import { Popover } from "path/to/Popover";

// Example usage
<Popover content="Popover text" disabled={false}>
  <span>Hover over me</span>
</Popover>;
```
