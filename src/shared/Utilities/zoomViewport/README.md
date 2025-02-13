# Overview

The `zoomViewport` function adjusts the zoom level of the viewport on a webpage. It updates the viewport meta tag to set the `initial-scale` and `maximum-scale` properties to the specified zoom level. This can be useful for dynamically changing the zoom level across different devices, including mobile devices like iPhones.

# API

##### Parameters

- **zoom**: The zoom level to set for the viewport. This value should be between 0 and 1, where 1 represents 100% zoom (default view), and values less than 1 will zoom out the content.

##### Return value

- This function does not return a value. It modifies the viewport meta tag and triggers a resize event to prompt the browser to re-render the content.

# Usage

```typescript
import { zoomViewport } from "./path-to-your-module";

// Setting the viewport zoom level to 80%
zoomViewport({ zoom: 0.8 });
```
