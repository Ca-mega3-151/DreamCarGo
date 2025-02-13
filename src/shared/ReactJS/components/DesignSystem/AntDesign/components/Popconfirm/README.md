# Overview

The `Popconfirm` component extends the functionality of the Ant Design Popconfirm component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Popconfirm component.

# Props

| Prop              | Type                                         | Default                | Description                                                                            |
| ----------------- | -------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| open              | `boolean`                                    | -                      | Whether the Popconfirm is visible.                                                     |
| arrow             | boolean                                      | true                   | Whether to display an arrow pointing to the reference element.                         |
| cancelButtonProps | object                                       | -                      | Properties for the cancel button.                                                      |
| cancelText        | string/ReactNode                             | -                      | The text of the cancel button.                                                         |
| children          | ReactNode                                    | -                      | The content of the Popconfirm.                                                         |
| className         | string                                       | -                      | Custom CSS class for styling the Popconfirm.                                           |
| content           | string/ReactNode                             | -                      | The content of the Popconfirm.                                                         |
| disabled          | boolean                                      | -                      | Whether the Popconfirm is disabled.                                                    |
| okButtonProps     | object                                       | -                      | Properties for the OK button.                                                          |
| okText            | string/ReactNode                             | -                      | The text of the OK button.                                                             |
| onCancel          | function                                     | -                      | Callback function triggered when the cancel button is clicked.                         |
| onConfirm         | function                                     | -                      | Callback function triggered when the OK button is clicked.                             |
| openVariant       | `'controlled-state' \| 'uncontrolled-state'` | `'uncontrolled-state'` | Determines whether the popconfirm's open state is controlled externally or internally. |

# Usage

```jsx
import { Popconfirm } from "path/to/Popconfirm";
import { Button } from "path/to/Button";

// Example usage
<Popconfirm content="Are you sure you want to delete this?" onConfirm={() => console.log("Confirmed")} onCancel={() => console.log("Cancelled")} okText="Yes" cancelText="No">
  <Button>Delete</Button>
</Popconfirm>;
```
