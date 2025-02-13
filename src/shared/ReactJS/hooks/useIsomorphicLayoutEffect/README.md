# Overview

`useIsomorphicLayoutEffect` is a custom React hook that serves as a drop-in replacement for React's `useEffect` and `useLayoutEffect`. It automatically uses `useLayoutEffect` when the DOM environment is available, ensuring that effects are synchronized with the layout phase. In server-side rendering (SSR) environments where the DOM is not available, it falls back to `useEffect` to avoid hydration issues and warnings from React.

# Options

This hook requires no options. It intelligently detects whether the DOM is available and chooses the appropriate effect hook accordingly.

# Usage

```jsx
import React from "react";
import { useIsomorphicLayoutEffect } from "path-to-useIsomorphicLayoutEffect-hook";

export default function App() {
  useIsomorphicLayoutEffect(() => {
    // Place your effect logic here.
    // It will execute as useLayoutEffect in the browser,
    // and as useEffect during server-side rendering.
  });

  return (
    <div>
      <p>Your content here</p>
    </div>
  );
}
```
