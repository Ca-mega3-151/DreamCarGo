# Overview

A custom React hook that retrieves and tracks the dimensions and position of a DOM element relative to the viewport, updating the values dynamically on window resize or scroll.

# Options

No options are required to use this hook.

# Usage

```jsx
import React, { useRef } from "react";
import { useRect } from "...";

export default function App() {
  const myRef = useRef(null);
  const rect = useRect(myRef.current);

  return (
    <div ref={myRef}>
      <p>
        Element dimensions: {rect.width}x{rect.height}
      </p>
      <p>
        Position: Top - {rect.top}, Bottom - {rect.bottom}, Left - {rect.left}, Right - {rect.right}
      </p>
    </div>
  );
}
```
