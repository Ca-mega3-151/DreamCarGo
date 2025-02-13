# Overview

`useMediaQuery` is a custom React hook that allows you to track the state of a media query within your React components. This hook simplifies the process of working with media queries by automatically updating the component state based on changes to the media query.

# Options

- `query: string` - The media query string to track.
- `options: UseMediaQueryOptions` - Optional configuration options for customizing hook behavior.
  - `defaultValue?: boolean` - The default value to return when the media query is not applicable. Default is `false`.
  - `initializeWithValue?: boolean` - Indicates whether to initialize the hook with the value of the media query. Default is `true`.

# Usage

```jsx
import React from "react";
import { useMediaQuery } from "path-to-useMediaQuery-hook";

function ResponsiveComponent() {
  // Track media query for min-width: 768px
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  return <div>{isLargeScreen ? <p>Large screen layout</p> : <p>Small screen layout</p>}</div>;
}

export default ResponsiveComponent;
```
