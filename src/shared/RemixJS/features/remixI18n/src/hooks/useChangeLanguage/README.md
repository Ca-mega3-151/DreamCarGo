# Overview

The `useChangeLanguage` hook is designed to automatically detect changes in the locale returned by the root route loader and call `i18n.changeLanguage` with the new locale to ensure translations are loaded.

# Parameters

- **locale: string**: The locale returned by the root route loader.

# Example

```typescript
import { useChangeLanguage } from "./useChangeLanguage";

const YourComponent = () => {
  useChangeLanguage("en");
  // Your component logic...
};
```
