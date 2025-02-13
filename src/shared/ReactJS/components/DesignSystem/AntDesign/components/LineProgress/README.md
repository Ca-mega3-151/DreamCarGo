# Overview

The `LineProgress` component extends the functionality of the Ant Design Progress component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Progress component.

# Props

| Prop            | Type                                                      | Default     | Description                                                 |
| --------------- | --------------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| className       | `string`                                                  | -           | Custom CSS class for styling the progress bar container.    |
| showInfo        | `boolean`                                                 | -           | Whether to display the progress percentage or status.       |
| percent         | `number`                                                  | -           | The current percentage of the progress.                     |
| size            | `string` \| `{ width: number \| string; height: number }` | `'default'` | The size of the progress bar.                               |
| percentPosition | `string`                                                  | -           | The position of the progress percentage.                    |
| strokeColor     | `string` \| `StringGradients`                             | -           | The stroke color of the progress bar.                       |
| format          | `(percent: number \| undefined) => ReactNode`             | -           | Custom format function for the progress percentage display. |

# Usage

```jsx
import { LineProgress } from "path-to-LineProgress";

// Example usage
<LineProgress className="custom-progress" showInfo percent={75} size={{ width: 200, height: 20 }} percentPosition="right" strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }} format={(percent) => `${percent}%`} />;
```
