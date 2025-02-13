# Overview

Custom React hook to show a confirmation popup based on a condition.

# Options

| Option                   | Type       | Description                                                                        |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------- |
| whenEnableForRemixRouter | `Function` | Function to determine if the prompt should be enabled for Remix Router navigation. |
| whenEnableForBrowser     | `Function` | Function to determine if the prompt should be enabled for browser actions.         |

# Usage

```jsx
import { useCallbackPrompt } from "...";

export default function App() {
  const { showPrompt, confirmNavigation, cancelNavigation } = useCallbackPrompt({
    whenEnableForRemixRouter: () => true,
    whenEnableForBrowser: () => true,
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConfirmDialog isOpen={showPrompt} onClose={cancelNavigation} onConfirm={confirmNavigation} />
      </body>
    </html>
  );
}
```
