# Overview

`useTimeout` is a custom React hook that executes a callback function after a specified delay. It is akin to using `setTimeout` in a functional React component with the added benefits of automatically cleaning up the timeout when the component unmounts or the delay is changed.

# Options

- **callback**: The function to execute after the delay.
- **delay**: The time in milliseconds to wait before executing the callback. If `null`, the timeout is cancelled.

# Usage

```jsx
import React from "react";
import { useTimeout } from "path-to-useTimeout-hook";

export default function DelayedLogger() {
  const logMessage = () => {
    console.log("This will be logged after 2 seconds");
  };

  useTimeout(logMessage, 2000);

  return <div>Check your console after 2 seconds.</div>;
}
```
