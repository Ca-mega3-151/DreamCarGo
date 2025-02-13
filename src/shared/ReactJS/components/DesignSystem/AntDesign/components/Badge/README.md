# Overview

The `Badge` component extends the functionality of the Ant Design Badge component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Badge component.

# Props

| Prop      | Type               | Default | Description                                   |
| --------- | ------------------ | ------- | --------------------------------------------- |
| children  | `ReactNode`        | -       | The content to be rendered inside the badge.  |
| className | `string`           | -       | Custom CSS class for styling the badge.       |
| color     | `string`           | -       | The color of the badge.                       |
| content   | `ReactNode`        | -       | Content to show in the badge.                 |
| dot       | `boolean`          | -       | Whether to display a dot instead of a number. |
| offset    | `[number, number]` | -       | Set offset of the badge.                      |
| showZero  | `boolean`          | -       | Whether to show the badge when count is zero. |
| size      | `string`           | -       | The size of badge.                            |

# Usage

```jsx
import { Badge } from "path-to-Badge";

// Example usage
<Badge className="custom-class" color="blue" content={5} dot={false} offset={[10, 10]} showZero={true}>
  <YourComponent />
</Badge>;
```
