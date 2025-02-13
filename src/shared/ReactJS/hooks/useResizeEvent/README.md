# Overview

The `useResizeEvent` hook is designed to manage and respond to resize events in a React application efficiently. It uses a utility to attach listeners to specific elements via `ResizeObserver` or falls back to window resize event listeners. This hook is ideal for responsive designs or dynamic layout adjustments, ensuring actions are executed only when necessary and in response to dependency changes.

# Options

### Parameters

- **effect**: `Effect`: A callback function executed when a resize event occurs. This function should follow the rules of React effects, similar to `useEffect`, including considerations for cleanup and dependencies.
- **dependencies**: `Array<any>`: An array of dependencies that the effect depends on. The effect will only re-run if these dependencies change.

# Usage

Here's an example of how `useResizeEvent` can be used in a component:

```jsx
import React, { useState } from "react";
import { useResizeEvent } from "path-to-useResizeEvent"; // Replace with the actual path

const MyComponent = () => {
  const [size, setSize] = useState(window.innerWidth);

  useResizeEvent(() => {
    setSize(window.innerWidth);
  }, [size]);

  return <div>Current window width: {size}</div>;
};
```
