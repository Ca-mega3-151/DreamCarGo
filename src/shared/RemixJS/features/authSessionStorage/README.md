# Overview

`AuthSessionStorage` manages authentication-related sessions using Remix's session storage. It provides functionalities to create, manage, and guard sessions within a Remix framework environment.

# API Reference

### Constructor

#### `AuthSessionStorage({ loginUrl, options }): AuthSessionStorage<Data>`

- `loginUrl`: URL to redirect to upon login.
- `options`: Session ID storage strategy options.

### Methods

- `getSession(request: Request): Promise<Session<Data, Data>>`: Retrieves the session based on the provided request object.
- `createSession({ request, sessionData, remember, redirectTo }): Promise<TypedResponse<never>>`: Creates or updates a session with provided data.
- `destroySession({ request, redirectUrl }): Promise<TypedResponse<never>>`: Destroys the session and redirects to the login URL.
- `guard({ request, condition, homeUrl }): Promise<Omit<Session<Data, Data>, 'data'> & { data: Required<Session<Data, Data>['data']> }>`: Guards routes by checking session existence and returns session data. Throws a redirect if necessary.
- `commitSessionAsCookieValue(session: Session<Data, Data>): Promise<string>`: Commits the session and returns the session as a cookie string.
- `commitSessionAsHeaders(session: Session<Data, Data>): Promise<Headers>`: Commits the session and returns the session as HTTP headers.

# Usage

```typescript
// utils/sessionStorage.ts
type SessionData = {
  token: string;
  role: string;
};
const authSessionStorage = new AuthSessionStorage<SessionData>({
  loginUrl: "/login", // URL to redirect to upon login
  options: {},
});

// _auth.login.tsx
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  /*
   * Code logic to get SessionData
   */
  const sessionData: SessionData = {
    token: "...",
    role: "...",
  };
  return authSessionStorage.createSession({
    request,
    redirectTo: new URL(request.url).searchParams.get("redirectTo") ?? "/dashboard",
    remember: true, // or data.remember depending on your logic
    sessionData,
  });
};

// _auth.tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);
  const { searchParams } = new URL(request.url);
  if (!isEmpty(session.data)) {
    throw redirect(searchParams.get("redirectTo") ?? "/");
  }
  return null;
};

// _account.tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return authSessionStorage.guard({ request });
};
```
