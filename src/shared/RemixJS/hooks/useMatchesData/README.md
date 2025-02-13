# Overview

Custom React hook for Remix Run to efficiently retrieve router data based on route ID using the `useMatches` hook.

# Options

| Option | Type     | Description                                  |
| ------ | -------- | -------------------------------------------- |
| id     | `string` | The route ID for which to retrieve the data. |

# Usage

```typescript
function isUser(user: unknown): user is User {
    return (
      user != null &&
      typeof user === "object" &&
      "email" in user &&
      typeof user.email === "string"
    );
  }

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

// root.tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/_static/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// routes/notes.tsx
export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return ...
}
```
