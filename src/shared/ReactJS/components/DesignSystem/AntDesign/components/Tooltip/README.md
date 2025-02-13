# Overview

The `Tooltip` component extends the functionality of the Ant Design Tooltip component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tooltip component.

# Props

| Prop              | Type                                         | Default                | Description                                                                         |
| ----------------- | -------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| className         | `string`                                     | -                      | Custom CSS class for styling the tooltip.                                           |
| arrow             | `boolean`                                    | `true`                 | Whether to display an arrow pointing to the reference element.                      |
| children          | `ReactNode`                                  | -                      | The trigger of the tooltip.                                                         |
| color             | `string`                                     | -                      | The color of the tooltip.                                                           |
| content           | `string \| ReactNode`                        | -                      | The content of the tooltip.                                                         |
| trigger           | `string`                                     | -                      | The trigger mode which can be 'hover', 'focus', 'click', or 'contextMenu'.          |
| overlayClassName  | `string`                                     | -                      | Custom CSS class for the overlay.                                                   |
| disabled          | `boolean`                                    | `false`                | Whether the tooltip is disabled.                                                    |
| open              | `boolean`                                    | -                      | Whether the tooltip is visible, in controlled mode.                                 |
| onOpenChange      | `function`                                   | -                      | Callback when the open state changes.                                               |
| openVariant       | `'controlled-state' \| 'uncontrolled-state'` | `'uncontrolled-state'` | Determines whether the tooltip's open state is controlled externally or internally. |
| getPopupContainer | `function`                                   | -                      | Function to determine the container in which the tooltip is rendered.               |
| placement         | `string`                                     | -                      | The position of the tooltip relative to the target.                                 |

# Usage

```jsx
import { Tooltip } from "path/to/Tooltip";

// Example usage
<Tooltip content="Tooltip text" disabled={false}>
  <span>Hover over me</span>
</Tooltip>;
```
