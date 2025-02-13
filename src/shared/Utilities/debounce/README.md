# Overview

The `debounce` function ensures that a provided function is only called after a certain delay has passed since the last invocation.

# API

#### Parameters

- `func` (Function): The function to debounce.
- `delay` (number, optional): The delay in milliseconds. Default is 300 milliseconds.

#### Return Value

- A debounced function.

# Usage

1. Debouncing a function:

```javascript
import { debounce } from "path-to-debounce";

// Define a function to debounce
function myFunction(data) {
  console.log("Debounced function called", data);
}

// Create a debounced version of the function
const debouncedFunction = debounce((data) => myFunction(data), 500);

// Call the debounced function
debouncedFunction(data);
```
