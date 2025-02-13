# Overview

`usePrevious` is a custom React hook that captures and stores the previous value of a stateful variable from the last render.

# Options

This hook does not require any options. It only takes a single argument, the current value, and returns its previous value.

# Usage

```jsx
import React, { useState } from "react";
import { usePrevious } from "path-to-usePrevious-hook";

export default function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <h1>
        Now: {count}, Before: {previousCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
