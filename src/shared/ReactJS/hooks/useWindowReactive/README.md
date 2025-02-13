# Overview

The `useWindowReactive` hook is designed to manage and respond to window focus and visibility change events in a React application. This hook is useful for performing actions such as revalidating data or triggering updates when the window gains focus or when its visibility changes, ensuring that these actions are executed only when necessary.

# Options

### Parameters

- **enabled**: `boolean`: Determines if the event listeners should be enabled. If false, the listeners will be removed. Default is `true`.
- **callback**: `() => void`: A callback function executed when a window focus or visibility change event occurs.

# Usage

Here's an example of how `useWindowReactive` can be used in a component:

```jsx
import React, { useState } from "react";
import { useWindowReactive } from "path-to-useWindowReactive"; // Replace with the actual path

const MyComponent = () => {
  const [isFocused, setIsFocused] = useState(document.hasFocus());

  useWindowReactive({
    enabled: true,
    callback: () => {
      setIsFocused(document.hasFocus());
    },
  });

  return <div>Window is {isFocused ? "focused" : "not focused"}</div>;
};
```
