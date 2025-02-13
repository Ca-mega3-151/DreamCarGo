# Overview

The `useDeepCompareCallback` hook is a custom React hook designed to memoize callbacks while performing a deep comparison of the dependencies. This ensures that the callback is only recreated when the actual data in the dependencies changes, and not just the object or array references.

# Options

### Parameters

- **callback**: Function: The callback function you want to memoize.
- **dependencies**: DependencyList: A list of dependencies that the callback depends on.

### Return Value

- `Function`: The memoized callback.

# Usage

```jsx
import React, { useEffect } from "react";
import { useDeepCompareCallback } from "...";

export default function App() {
  const complexObject = { key1: "value1", key2: "value2" };

  const memoizedCallback = useDeepCompareCallback(() => {
    // Some side effect involving the complexObject
    console.log(complexObject.key1, complexObject.key2);
  }, [complexObject]);

  useEffect(() => {
    // The memoizedCallback is used here
    memoizedCallback();
  }, [memoizedCallback]);

  return (
    <div>
      <p>Check the console for the output.</p>
    </div>
  );
}
```
