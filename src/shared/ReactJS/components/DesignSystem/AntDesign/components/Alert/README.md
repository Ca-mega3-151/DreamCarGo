# Overview

The `Alert` component extends the functionality of the Ant Design Alert component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Alert component.

# Props

| Prop        | Type        | Default   | Description                                  |
| ----------- | ----------- | --------- | -------------------------------------------- |
| className   | `string`    | -         | Custom CSS class for styling the alert.      |
| color       | `Color`     | 'primary' | Custom color for the alert.                  |
| variant     | `Variant`   | 'bold'    | Variant style of the alert.                  |
| message     | `ReactNode` | -         | Main message content of the alert.           |
| description | `ReactNode` | -         | Additional description content of the alert. |
| icon        | `ReactNode` | -         | Custom icon for the alert.                   |
| action      | `ReactNode` | -         | The action of Alert.                         |

# Usage

```jsx
import { Alert } from "path-to-Alert";

// Example usage
<Alert className="custom-alert" color="success" variant="outlined" message="This is a success alert!" description="Additional description for the alert." icon={<IconComponent />} />;
```
