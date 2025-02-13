# Overview

`useDebouncedValue` is a custom React hook that debounces an input value. The hook delays updating the value until after a specified timeout has elapsed without any new updates.

# Options

- **timeoutMs**: The number of milliseconds to delay the debounced value. If not specified, a default of 500ms is used.

# Usage

```jsx
import React, { useState } from "react";
import { useDebouncedValue } from "path-to-useDebouncedValue-hook";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const { value } = useDebouncedValue(inputValue, { timeoutMs: 300 });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Use `value` for searching or filtering logic that you want to debounce
  useEffect(() => {
    // Trigger search or filter operation with `value`
    console.log(value);
  }, [value]);

  return <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type to search..." />;
}
```
