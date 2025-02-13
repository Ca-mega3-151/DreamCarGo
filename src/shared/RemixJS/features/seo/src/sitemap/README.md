# Overview

`getSitemapXml` is a utility function designed to generate XML content for a sitemap based on the provided request and Remix context. It facilitates the creation of structured sitemap entries by fetching relevant data from Remix routes.

# API Reference

### Function

#### `getSitemapXml(request: Request, remixContext: EntryContext): Promise<string>`

- `request`: The incoming request object.
- `remixContext`: The Remix entry context.

This function returns a Promise that resolves to the XML content of the generated sitemap.

# Usage

```javascript
// entry.server.ts
...
const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) => {
  for (const handler of otherRootRouteHandlers) {
    const otherRouteResponse = await handler(request, remixContext);
    if (otherRouteResponse) {
      return otherRouteResponse;
    }
  }

  return isbot(request.headers.get('user-agent') ?? '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
};
...

// utils/otherRootRoutets.server.ts
import { getSitemapXml } from "remixjs";
import { EntryContext } from "remix";
import { generateSitemap } from "@balavishnuvj/remix-seo";

type Handler = (
  request: Request,
  remixContext: EntryContext
) => Promise<Response | null> | null;

export const otherRootRoutes: Record<string, Handler> = {
  "/sitemap.xml": async (request, remixContext) => {
    return generateSitemap(request, remixContext, {
      siteUrl: "https://balavishnuvj.com",
    });
  },
};

export const otherRootRouteHandlers: Array<Handler> = [
  ...Object.entries(otherRootRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null;

      return handler(request, remixContext);
    };
  }),
];

// routes/blogs.$slug.tsx// routes/blog/$blogslug.tsx
export const handle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const blogs = await db.blog.findMany();
    return blogs.map((blog) => {
      return { route: `/blog/${blog.slug}`, priority: 0.7 };
    });
  },
};
```
