# Overview

A custom React hook that memoizes a dependency list based on deep equality checks. It ensures that changes in the dependency list are only recognized when there is an actual difference in the content of the dependencies, not just referential changes.

# Options

### Parameters

- **value**: `DependencyList`: An array of dependencies to be memoized.

### Return Value

- `DependencyList`: The memoized list of dependencies.

# Usage

```jsx
import React, { useEffect } from "react";
import { useDeepCompareMemoize } from "...";

export default function App() {
  const someObjectDependency = { a: 1 };

  // This effect will only re-run if `someObjectDependency` actually changes,
  // not just when its reference changes.
  useEffect(
    () => {
      console.log("Effect invoked.");
      // Some effect logic here...
    },
    useDeepCompareMemoize([someObjectDependency]),
  );

  return (
    <div>
      <p>Check the console for effect invocation.</p>
    </div>
  );
}
```
