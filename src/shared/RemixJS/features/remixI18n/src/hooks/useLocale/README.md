# Overview

The `useLocale` hook is designed to retrieve the locale returned by the root route loader under the specified key. It provides a convenient way to access the locale string, which can be used for localization purposes within React components.

# Parameters

- **localeKey: string**: The key under which the locale is stored in the data returned by the root route loader. Default value is 'locale'.

# Return Value

- Returns the locale string obtained from the root route loader data.

# Example

```typescript
import { useLocale } from "./useLocale";

const YourComponent = () => {
  const locale = useLocale(); // Get the locale using the default key 'locale'
  // Your component logic...
};

const YourOtherComponent = () => {
  const locale = useLocale("language"); // Get the locale using a custom key 'language'
  // Your component logic...
};
```
