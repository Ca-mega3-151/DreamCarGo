# Overview

The `Dropdown` component extends the functionality of the Ant Design Dropdown component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Dropdown component.

# Props

| Prop          | Type                             | Default | Description                                                                                        |
| ------------- | -------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| children      | `ReactNode`                      | -       | The trigger element for the dropdown.                                                              |
| className     | `string`                         | -       | Custom CSS class for styling the dropdown.                                                         |
| items         | `Item[]`                         | -       | The menu items to be displayed.                                                                    |
| expandIcon    | `ReactNode`                      | -       | The icon for expanding the menu items.                                                             |
| footer        | `ReactNode`                      | -       | The footer to be displayed at the bottom of the dropdown.                                          |
| arrow         | `boolean`                        | `true`  | Whether to show the arrow on the dropdown.                                                         |
| trigger       | `string[]`                       | -       | The trigger mode of the dropdown.                                                                  |
| menuMaxHeight | `string \| number`               | -       | The maximum height of the dropdown menu. Makes the menu scrollable if content exceeds this height. |
| onMenuScroll  | `UIEventHandler<HTMLDivElement>` | -       | Callback function that is triggered when the menu is scrolled.                                     |
| onOpenChange  | `Function`                       | -       | Callback function that is triggered when the dropdown's open state is changed.                     |
| open          | `boolean`                        | -       | Whether the dropdown menu is currently open.                                                       |

# Usage

```jsx
import { Dropdown } from "path/to/Dropdown";

// Example usage
const items = [
  {
    key: "1",
    label: "Item 1",
    icon: <ItemIcon />,
    children: [
      {
        key: "1-1",
        label: "Sub Item 1-1",
      },
      {
        key: "1-2",
        label: "Sub Item 1-2",
      },
    ],
  },
  {
    key: "2",
    label: "Item 2",
  },
];

<Dropdown className="custom-dropdown" items={items} expandIcon={<ExpandIcon />} footer={<div>Footer Content</div>} trigger={["click"]}>
  <a href="#">Click me</a>
</Dropdown>;
```
