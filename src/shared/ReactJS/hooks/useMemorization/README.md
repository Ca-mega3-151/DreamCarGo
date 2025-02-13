# Overview

A custom React hook that optimizes performance by memorizing a computed value based on a given condition. It ensures that the value is only recomputed when necessary according to a custom `shouldUpdate` function.

# Options

### Parameters

- **getValue**: `Function`: A function that returns the value to be memorized.
- **condition**: `Condition`: A condition that determines when the value should be recomputed.
- **shouldUpdate**: `Function`: A function that takes the previous and next conditions and returns a boolean indicating whether the value should be recomputed.

### Return Value

- `Value`: The memorized value.

# Usage

```jsx
import React from "react";
import { useMemorization } from "...";

export default function App() {
  const condition = [1];
  const shouldUpdate = (prev, next) => prev[0] !== next[0];
  const value = useMemorization(() => Math.random(), condition, shouldUpdate);

  return (
    <div>
      <p>Memorized value: {value}</p>
    </div>
  );
}
```
