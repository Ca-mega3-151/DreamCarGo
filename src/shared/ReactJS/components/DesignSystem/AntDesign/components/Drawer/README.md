# Overview

The `Drawer` component extends the functionality of the Ant Design Drawer component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Drawer component.

# Props

| Prop            | Type        | Default   | Description                                                     |
| --------------- | ----------- | --------- | --------------------------------------------------------------- |
| open            | `boolean`   | -         | Whether the drawer is open.                                     |
| className       | `string`    | -         | Custom CSS class for styling the drawer.                        |
| maskClosable    | `boolean`   | `true`    | Whether to close the drawer when the mask is clicked.           |
| onClose         | `Function`  | -         | Callback function triggered when the drawer is closed.          |
| placement       | `string`    | `'right'` | The placement of the drawer ('top', 'right', 'bottom', 'left'). |
| title           | `ReactNode` | -         | The title of the drawer.                                        |
| closeIcon       | `ReactNode` | -         | The custom close icon.                                          |
| footer          | `ReactNode` | -         | The footer of the drawer.                                       |
| children        | `ReactNode` | -         | The content of the drawer.                                      |
| mask            | `boolean`   | `true`    | Whether to display the mask (overlay behind the drawer).        |
| afterOpenChange | `Function`  | -         | Callback triggered after the open state of the drawer changes.  |
| width           | `number`    | -         | Width of the drawer.                                            |
| loading         | `boolean`   | `false`   | Whether the drawer is in loading state.                         |

# Usage

```jsx
import { Drawer } from "path/to/Drawer";

// Example usage
<Drawer open={true} className="custom-drawer" maskClosable={true} onClose={() => console.log("Drawer closed")} placement="right" title="Drawer Title" closeIcon={<CustomCloseIcon />} footer={<div>Footer Content</div>} width={300} loading={false}>
  <p>Drawer Content</p>
</Drawer>;
```
