# Overview

The `Ribbon` component extends the functionality of the Ant Design Badge Ribbon component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Badge Ribbon component.

# Props

| Prop      | Type        | Default | Description                                           |
| --------- | ----------- | ------- | ----------------------------------------------------- |
| children  | `ReactNode` | -       | The content to be rendered inside the ribbon.         |
| className | `string`    | -       | Custom CSS class for styling the ribbon.              |
| color     | `string`    | -       | The color of the ribbon.                              |
| placement | `string`    | -       | The placement of the ribbon. Can be 'start' or 'end'. |
| content   | `ReactNode` | -       | The content to be displayed on the ribbon.            |

# Usage

```jsx
import { Ribbon } from "path-to-Ribbon";

// Example usage
<Ribbon className="custom-class" color="red" placement="start" content="New">
  <YourComponent />
</Ribbon>;
```
