# Overview

A custom React hook that monitors and tracks the network status of the user's device. It provides real-time updates on whether the user is online or offline, responding dynamically to changes in network connectivity.

# Options

No options are required to use this hook.

# Usage

```jsx
import React from "react";
import { useDetectNetworkStatus } from "...";

export default function App() {
  const { isOnline } = useDetectNetworkStatus();

  return (
    <div>
      <p>You are currently: {isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}
```
