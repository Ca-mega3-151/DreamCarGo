# Overview

The `TableActions` component renders a dropdown menu containing actions for a table. It provides a clean and compact interface for displaying common actions, such as edit, delete, or more options.

# Props

The `TableActions` component accepts the following props:

| Prop    | Type             | Default | Description                                                                                                                                                 |
| ------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items` | `DropdownItem[]` | -       | An array of items to be displayed in the dropdown menu. Each item should be of type `ItemType` with an optional `hidden` property to hide it from the menu. |

Each item in the `items` array should adhere to the following type:

```typescript
interface ItemType {
  key?: React.Key;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: (params?: any) => void;
}
```
