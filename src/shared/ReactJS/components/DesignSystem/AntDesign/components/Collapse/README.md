# Overview

The `Collapse` component extends the functionality of the Ant Design Collapse component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Collapse component.

# Props

| Prop        | Type                                                                                                                                                     | Default  | Description                                                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| className   | `string`                                                                                                                                                 | -        | Custom CSS class for styling the collapse component.                                                                          |
| bordered    | `boolean`                                                                                                                                                | true     | Whether to show a border around the collapse component.                                                                       |
| accordion   | `boolean`                                                                                                                                                | -        | If true, only one panel can be expanded at a time.                                                                            |
| items       | `Array<{ key: Key; label: ReactNode; children: ReactNode; className?: string; onClick?: () => void; hidden?: boolean; collapsible?: CollapsibleType; }>` | []       | Array of items to be rendered in the Collapse component. Each item represents a panel with its content and settings.          |
| value       | `Key` \| `Key[]`                                                                                                                                         | -        | The key(s) of the active panel(s). When `accordion` is true, it expects a single key. Otherwise, it expects an array of keys. |
| onChange    | `Accordion extends true ? (value: Key \| undefined) => void : (value: Key[] \| undefined) => void`                                                       | -        | Callback function triggered when the active panel(s) change.                                                                  |
| collapsible | `CollapsibleType`                                                                                                                                        | 'header' | Specify if the panel can be collapsed. Can be 'header', 'disabled', or undefined.                                             |
| size        | `string`                                                                                                                                                 | 'header' | The size of collapse.                                                                                                         |

# Usage

```jsx
import { Collapse } from "path-to-Collapse";

// Example usage
<Collapse
  className="custom-collapse"
  bordered={false}
  accordion
  value="panel1"
  onChange={(value) => console.log(value)}
  items={[
    {
      key: "panel1",
      label: "Panel 1",
      children: <div>Content for Panel 1</div>,
      className: "panel1-class",
    },
    {
      key: "panel2",
      label: "Panel 2",
      children: <div>Content for Panel 2</div>,
      className: "panel2-class",
      hidden: false,
    },
  ]}
/>;
```
