# Overview

The `Segmented` component extends the functionality of the Ant Design Segmented component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Segmented component.

# Props

| Prop         | Type                                         | Default              | Description                                                                   |
| ------------ | -------------------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| className    | string                                       | -                    | Custom CSS class for styling the segmented control.                           |
| block        | boolean                                      | -                    | Whether the segmented control should take up the full width of its container. |
| disabled     | boolean                                      | -                    | Whether the segmented control is disabled.                                    |
| items        | array                                        | []                   | The items to be displayed in the segmented control.                           |
| value        | string                                       | -                    | The value of the segmented control.                                           |
| onChange     | function                                     | -                    | Callback function triggered when the value changes.                           |
| size         | string                                       | -                    | The size of segmented.                                                        |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the segmented is in a controlled or uncontrolled state.         |

# Usage

```jsx
import { Segmented } from "path/to/Segmented";

// Example usage
const items = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2", icon: <SomeIcon /> },
  { label: "Option 3", value: "3", disabled: true },
];

<Segmented items={items} value="1" onChange={(newValue) => console.log(newValue)} />;
```
