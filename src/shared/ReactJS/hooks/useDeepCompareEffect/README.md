# Overview

The `useDeepCompareEffect` hook is a custom React hook that behaves similarly to the built-in `useEffect` hook, but with a deep comparison on the dependencies list. This is beneficial in scenarios where dependencies are complex objects or arrays and a shallow comparison is not sufficient to accurately determine if changes have occurred.

# Options

### Parameters

- **effect**: `EffectCallback`: A function containing code to run after the component renders. This function may optionally return a clean-up function.
- **dependencies**: `DependencyList`: A list of dependencies that triggers the effect to run when any of them have changed, as determined by a deep comparison.

### Return Value

- `void`: This hook does not return a value.

# Usage

```jsx
import React, { useState } from "react";
import { useDeepCompareEffect } from "...";

export default function App() {
  const [state, setState] = useState({ key: "value" });

  useDeepCompareEffect(() => {
    console.log("Effect has run due to a change in state.");

    // Optional clean-up logic can be returned here
    return () => {
      console.log("Cleaning up effect.");
    };
  }, [state]);

  return (
    <div>
      <p>Current state: {JSON.stringify(state)}</p>
      <button onClick={() => setState({ key: "new value" })}>Change State</button>
    </div>
  );
}
```
