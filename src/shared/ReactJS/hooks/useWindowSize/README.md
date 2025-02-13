# Overview

A custom React hook that provides an easy way to track and respond to changes in the window's dimensions.

# Options

No options are required to use this hook.

# Usage

```jsx
import { useWindowSize } from "...";

export default function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>
        Current window dimensions: {width}x{height}
      </p>
    </div>
  );
}
```
