# Overview

The `useDeepCompareMemo` hook is a custom React hook that memoizes a computed value while performing a deep comparison on the dependencies list.

# Options

### Parameters

- **factory**: `Function`: A function that returns the value to be memoized.
- **dependencies**: `DependencyList`: A list of dependencies that determines when the memoized value should be recomputed.

### Return Value

- `T`: The memoized value.

# Usage

```jsx
import React from "react";
import { useDeepCompareMemo } from "...";

export default function App() {
  const complexObject = { key1: "value1", key2: "value2" };
  const memoizedValue = useDeepCompareMemo(() => {
    // Computationally expensive calculation
    return complexObject.key1 + complexObject.key2;
  }, [complexObject]);

  return (
    <div>
      <p>Memoized value: {memoizedValue}</p>
    </div>
  );
}
```
