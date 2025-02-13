# Overview

The `CircleProgress` component extends the functionality of the Ant Design Progress component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Progress component.

# Props

| Prop        | Type                                          | Default     | Description                                                 |
| ----------- | --------------------------------------------- | ----------- | ----------------------------------------------------------- |
| className   | `string`                                      | -           | Custom CSS class for styling the progress circle container. |
| showInfo    | `boolean`                                     | -           | Whether to display the progress percentage or status.       |
| percent     | `number`                                      | -           | The current percentage of the progress.                     |
| size        | `ProgressSize` \| `number`                    | `'default'` | The size of the progress circle.                            |
| strokeColor | `string` \| `StringGradients`                 | -           | The stroke color of the progress circle.                    |
| strokeWidth | `number`                                      | -           | The width of the progress circle stroke.                    |
| format      | `(percent: number \| undefined) => ReactNode` | -           | Custom format function for the progress percentage display. |
| type        | `'circle'` \| `'dashboard'`                   | `'circle'`  | The type of the progress circle.                            |

# Usage

```jsx
import { CircleProgress } from "path-to-CircleProgress";

// Example usage
<CircleProgress className="custom-progress" showInfo percent={75} size={150} strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }} strokeWidth={8} format={(percent) => `${percent}%`} type="dashboard" />;
```
