# Overview

The `UrlSearchParamsUtils` library is designed to facilitate URLSearchParams operations with Zod validation. It provides utility methods for encrypting and decrypting data into URLSearchParams strings, along with handling Zod validation errors.

# API

### `UrlSearchParamsUtilsError<T>`

Custom error class for `UrlSearchParamsUtils` that extends the base `Error` class.

- **Parameters**
  - `data`: The type of data associated with the error.
  - `type`: The type of error, either 'ZOD' for Zod validation errors or 'UNCAUGHT' for uncaught errors.

### `UrlSearchParamsUtils<T>`

Utility class for handling URLSearchParams operations with Zod validation.

- **Parameters**
  - `zodSchema`: The Zod schema used for data validation.

#### Methods

| Method                                                   | Description                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `encrypt(data: T): string`                               | Encrypts the provided data into a URLSearchParams string.                                    |
| `decrypt(encryptData: string \| Request): T`             | Decrypts a URLSearchParams string or Request object into the specified data type.            |
| `getUrlSearchParams(request?: Request): URLSearchParams` | Retrieves the URLSearchParams object from a Request object or the current window's location. |

# Usage

1. **Encrypting and Decrypting Valid Data**

```typescript
const schema = z.object({
  param1: z.string(),
  param2: z.number(),
});

const urlSearchParamsUtils = new UrlSearchParamsUtils({ zodSchema: schema });
const validData = { param1: "value1", param2: 42 };

const encryptedString = urlSearchParamsUtils.encrypt(validData);
const decryptedData = urlSearchParamsUtils.decrypt(encryptedString);

console.log(decryptedData); // Output: { param1: 'value1', param2: 42 }
```

2. **Handling Zod Validation Error**

```typescript
const schema = z.object({
  param1: z.string(),
  param2: z.number(),
});

const urlSearchParamsUtils = new UrlSearchParamsUtils({ zodSchema: schema });
const invalidData = { param1: "value1", param2: "invalid" };

try {
  const encryptedString = urlSearchParamsUtils.encrypt(invalidData);
} catch (error) {
  console.error(error); // Output: UrlSearchParamsUtilsError: Data is invalid { param1: 'value1', param2: 'invalid' }
}
```

3. **Retrieving URLSearchParams from Request Object**

```typescript
const schema = z.object({
  param1: z.string(),
  param2: z.number(),
});

const urlSearchParamsUtils = new UrlSearchParamsUtils({ zodSchema: schema });

const fakeRequest = new Request("http://example.com?param1=value1&param2=42");
const urlSearchParams = urlSearchParamsUtils.getUrlSearchParams(fakeRequest);

console.log(urlSearchParams.get("param1")); // Output: 'value1'
console.log(urlSearchParams.get("param2")); // Output: '42'
```
