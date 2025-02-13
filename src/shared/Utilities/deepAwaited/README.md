# Overview

The `deepAwaited` function is designed to recursively await all promises within an object, array, or value in JavaScript or TypeScript. This utility is particularly useful when working with complex data structures that may contain promises at various depths, ensuring that all promises are fully resolved before proceeding.

# API

### Parameters

- **obj**: `T`: The input object, array, or value that may contain promises at any level. The type `T` can be any JavaScript value, including nested objects or arrays with promises.

### Return Value

- Returns a `Promise<DeepAwaited<T>>`, where `T` is the original type of the input. The returned promise resolves to an object, array, or value that mirrors the structure of the input but with all promises deeply awaited.

# Usage

1. **Resolving Nested Promises in an Object**

If you have an object with nested promises and you want to ensure all promises are resolved, use the `deepAwaited` function:

```typescript
import { deepAwaited } from "./path-to-deepAwaited-function";

async function resolveNestedPromises() {
  const nestedObject = {
    a: Promise.resolve(1),
    b: {
      c: Promise.resolve(2),
      d: {
        e: Promise.resolve(3),
      },
    },
  };

  const resolvedObject = await deepAwaited(nestedObject);
  console.log(resolvedObject);
  // Output: { a: 1, b: { c: 2, d: { e: 3 } } }
}

resolveNestedPromises();
```

2. **Handling Arrays of Promises**

The `deepAwaited` function also works with arrays containing promises, ensuring all elements are resolved:

```typescript
import { deepAwaited } from "./path-to-deepAwaited-function";

async function resolveArrayPromises() {
  const arrayWithPromises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

  const resolvedArray = await deepAwaited(arrayWithPromises);
  console.log(resolvedArray);
  // Output: [1, 2, 3]
}

resolveArrayPromises();
```

3. **Dealing with Complex Structures**

For more complex structures with deeply nested promises, `deepAwaited` can handle the resolution seamlessly:

```typescript
import { deepAwaited } from "./path-to-deepAwaited-function";

async function resolveComplexStructure() {
  const complexObject = {
    a: Promise.resolve([Promise.resolve(1), Promise.resolve(2)]),
    b: {
      c: Promise.resolve([Promise.resolve(3), Promise.resolve(4)]),
    },
  };

  const resolvedComplexObject = await deepAwaited(complexObject);
  console.log(resolvedComplexObject);
  // Output: { a: [1, 2], b: { c: [3, 4] } }
}

resolveComplexStructure();
```
