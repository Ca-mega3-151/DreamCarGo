# Overview

The `Avatar` component extends the functionality of the Ant Design Avatar component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Avatar component.

# Props

| Prop       | Type                          | Default | Description                                                                                                     |
| ---------- | ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| className  | `string`                      | -       | Custom CSS class for styling the avatar.                                                                        |
| icon       | `ReactNode`                   | -       | The icon to be displayed inside the avatar.                                                                     |
| shape      | `string`                      | -       | The shape of the avatar.                                                                                        |
| size       | `number \| string`            | -       | The size of the avatar.                                                                                         |
| src        | `string`                      | -       | The source of the avatar image.                                                                                 |
| srcSet     | `string`                      | -       | The source set for the avatar image.                                                                            |
| children   | `ReactNode`                   | -       | The ReactNode to be displayed inside the avatar (`icon` > `children`).                                          |
| badge      | `ReactNode`                   | -       | The badge to be displayed on the avatar, typically for status indicators like notifications or online presence. |
| badgeProps | `Omit<BadgeProps, 'content'>` | -       | Additional properties for customizing the badge component.                                                      |

# Usage

```jsx
import { Avatar } from "path-to-Avatar";

// Example usage
<Avatar className="custom-class" gap={4} icon={<YourIcon />} shape="circle" size="large" src="https://example.com/avatar.png" srcSet="https://example.com/avatar@2x.png 2x">
  Username
</Avatar>;
```
