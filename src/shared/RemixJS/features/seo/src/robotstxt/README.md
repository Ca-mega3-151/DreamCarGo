# Overview

`generateRobotsTxt` is a utility function designed to generate the content of a robots.txt file based on provided RobotsPolicy objects. This function simplifies the process of constructing the content of a robots.txt file, which is commonly used to instruct web crawlers how to interact with a website.

# API Reference

## Function

### `generateRobotsTxt(policies: RobotsPolicy[]): string`

Generates a robots.txt content string based on the provided array of RobotsPolicy objects.

- `policies`: An array of RobotsPolicy objects representing various directives.

Returns:

- A string representing the content of a robots.txt file.

# Usage

```typescript
// routes/robots[.txt].ts
import { generateRobotsTxt } from "remixjs";

const policies = [
  { type: "userAgent", value: "*" },
  { type: "allow", value: "/public" },
  { type: "disallow", value: "/private" },
];

const robotsTxtContent = generateRobotsTxt(policies);

console.log(robotsTxtContent);
// Output:
// User-agent: *
// Allow: /public
// Disallow: /private
```
