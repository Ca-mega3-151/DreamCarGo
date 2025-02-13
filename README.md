![346997002_768659098264464_2837305745087619536_n](https://github.com/user-attachments/assets/dc0b67fb-ff9e-40e7-af4f-96ec343b5ba1)

<p align="center"><b>Start your <i>React Router Dom</i> project in seconds!</b></p>
<p align="center">A scalable and stable foundation tailored for your application needs. Focuses on best practices and exceptional developer experience (DX) while maintaining simplicity</p>

<h3 align="center"><ins><i>Keep everything simple and efficient.</i></ins></h3>
<p align="center">Created by <a href="https://www.facebook.com/tuong5920/">Lê Mạnh Tưởng</a> and maintained with ❤️</p>

# Features

- **Easy Migration:** Seamlessly migrate between RemixJS and React Router Dom, making it simple to adapt your application framework as needed.
- **Strict TypeScript Utilities:** Ensure robust and reliable code with utilities for strict type definitions, aligning with our commitment to simplicity and best practices.
- **Internationalization (i18n):** Easily localize your application with internationalization support.
- **Authentication:** Implement secure authentication mechanisms tailored to your application's needs.

# Migration Guide: From Remix.js to React Router DOM

This guide will help you migrate your Remix.js project to use React Router DOM. The migration involves changes to internationalization (i18n), API fetching, Remix libraries, authentication, and routing. Follow the steps below to ensure a smooth transition.

## Migrate i18n

### RemixJs

In Remix.js, you might be using remix-i18n for internationalization

```typescript
// I18n/i18n.server.ts
import { EntryContext, createCookie } from "@remix-run/node";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { RemixServerI18next } from "RemixJS/server";
import { i18nConfig } from "./config";

export const localeCookie = createCookie("i18n", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

export const i18nServer = new RemixServerI18next({
  detection: {
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
    cookie: localeCookie,
  },
  i18next: {
    ...i18nConfig,
  },
});

interface InitRemixI18n {
  request: Request;
  remixContext: EntryContext;
}
export const initRemixI18n = async ({ remixContext, request }: InitRemixI18n) => {
  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(remixContext);

  await instance.use(initReactI18next).init({
    ...i18nConfig,
    lng,
    ns,
  });

  return instance;
};
// I18n/i18n.client.ts
import { i18n } from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { i18nConfig } from "./config";

export const initRemixI18n = async (i18next: i18n) => {
  await i18next
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init(i18nConfig);
};
// entry.server.tsx
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { i18n } from 'i18next';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { PassThrough } from 'node:stream';
import { initRemixI18n } from './packages/common/I18n/i18n.server';
import { getPublicEnv } from './utils/enviroment/getPublicEnv';
import { ActionFunctionArgs, AppLoadContext, EntryContext, LoaderFunctionArgs } from '@remix-run/node';

const ABORT_DELAY = 5_000;

const handleBotRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  i18nInstance: i18n,
) => {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

const handleBrowserRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  instance: i18n,
  callbackName: string,
) => {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set('Content-Type', 'text/html');
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) => {
  const callbackName = isbot(request.headers.get('user-agent') ?? '') ? 'onAllReady' : 'onShellReady';
  const i18nInstance = await initRemixI18n({ remixContext, request });

  return isbot(request.headers.get('user-agent') ?? '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext, i18nInstance)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext, i18nInstance, callbackName);
};

export default handleRequest;

// entry.client.ts
import { RemixBrowser, useLocation, useMatches } from '@remix-run/react';
import i18next from 'i18next';
import { startTransition, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { initRemixI18n } from './packages/common/I18n/i18n.client';
import { getPublicEnv } from './utils/enviroment/getPublicEnv';


const hydrate = async () => {
  await initRemixI18n(i18next);
  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}

// root.tsx
import { cssBundleHref } from '@remix-run/css-bundle';
import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { FC } from 'react';
import { useChangeLanguage } from 'RemixJS/client';
import { i18nServer, localeCookie } from './packages/common/I18n/i18n.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18nServer.getLocale(request);

  return json(
    {
      locale,
    },
    {
      headers: {
        'Set-Cookie': await localeCookie.serialize(locale),
      },
    },
  );
};

export const meta: MetaFunction = () => {
  return [
    {
      charset: 'utf-8',
      title: 'Remixjs boilerplate',
      viewport: 'width=device-width,initial-scale=1',
    },
  ];
};

const App: FC = () => {
  const { locale } = useLoaderData<typeof loader>();

  const { i18n } = useChangeLanguage(locale);

  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
```

### React router DOM

You can continue using react-i18next with React Router DOM.

```typescript
// I18n/i18n.server.ts
import i18n, { Namespace, TFunction } from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { i18nConfig } from './config';
import { SearchParamKey } from '~/overrides/RemixJS/features/remixI18n/server';

i18n
  .use(Languagedetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ...i18nConfig,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      lookupQuerystring: SearchParamKey,
    },
  });

export const i18nServer = {
  getFixedT: <NS extends Namespace>(_request: Request, _namespaces: NS) => {
    return Promise.resolve(i18n.t as TFunction<NS>);
  },
};

// main.tsx
import i18next from 'i18next';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
);
```

## Migrate Remix Libraries

Replace any Remix-specific libraries or utilities with `react–router-dom`

### RemixJS

##### Remix API

```typescript
import { ... } from '@remix-run/serve';
import { ... } from '@remix-run/react';
import { ... } from '@remix-run/node';
```

##### Remix hook form API

```typescript
import { ... } from 'remix-hook-form';
```

##### Auth Session Storage

```typescript
import { AuthSessionStorage } from "RemixJS/server";
import { KeyOfSessionInCookie } from "./constants";

export interface SessionData {
  token: {
    refreshToken: string;
    accessToken: string;
  };
  role: string;
}
export const authSessionStorage = new AuthSessionStorage<SessionData>({
  loginUrl: "/login", // URL to redirect to upon login
  options: {
    name: KeyOfSessionInCookie,
  },
});
```

### React Router DOM

##### Remix run API

```diff
- import { ... } from '@remix-run/serve';
- import { ... } from '@remix-run/react';
- import { ... } from '@remix-run/node';
+ import { ... } from '~/overrides/@remix-run/react'
+ import { ... } from '~/overrides/@remix-run/node'
```

##### Remix hook form API

```diff
- import { ... } from 'remix-hook-form';
+ import { ... } from '~/overrides/remix-hook-form';
```

##### Remix image

```diff
- import { ... } from 'RemixJS/client'
+ import { ... } from '~/overrides/RemixJS/client'
```

##### Auth Session Storage

```diff
- import { AuthSessionStorage } from "RemixJS/server";
+ import { AuthSessionStorage } from "~/overrides/RemixJS/server";
import { KeyOfSessionInCookie } from "./constants";

export interface SessionData {
  token: {
    refreshToken: string;
    accessToken: string;
  };
  role: string;
}
export const authSessionStorage = new AuthSessionStorage<SessionData>({
  loginUrl: "/login", // URL to redirect to upon login
  options: {
    name: KeyOfSessionInCookie,
  },
});
```

##### Base hook

## Migrate Routes

### RemixJS

`app/routes`

- `_auth.login.tsx`
- `_auth.refresh-token.tsx`
- `_auth.tsx`
- `_dashboard.branding._index.tsx`
- `_dashboard.branding.$id.delete.tsx`
- `_dashboard.branding.$id.edit.tsx`
- `_dashboard.branding.create.tsx`
- `_dashboard.dashboard.tsx`
- `_dashboard.tsx`
- `_index.tsx`
- `403.tsx`
- `404.tsx`
- `500.tsx`
- `logout.tsx`
- `public.images.ts`

### React Router DOM

```typescript
// App.tsx
import { FC } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as Forbidden from './routes/403';
import * as NotFound from './routes/404';
import * as InternalError from './routes/500';
import * as IndexPage from './routes/_index';
import { AuthRoutes } from './routes/Auth';
import { DashboardRoutes } from './routes/Dashboard';
import * as Logout from './routes/logout';
import * as RootLayout from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout.Page />,
    errorElement: <Navigate to="/404" />,
    children: [
      ...AuthRoutes,
      ...DashboardRoutes,
      {
        path: '/',
        element: <IndexPage.Page />,
        loader: IndexPage.loader,
      },
      {
        path: '/500',
        element: <InternalError.Page />,
      },
      {
        path: '/404',
        element: <NotFound.Page />,
      },
      {
        path: '/403',
        element: <Forbidden.Page />,
      },
      {
        path: '/logout',
        element: null,
        action: Logout.action,
        loader: Logout.loader,
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};

// AuthRoutes
import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as AuthLayout from './src/_auth';
import * as Login from './src/_auth.login';

export const AuthRoutes: RouteObject[] = [
  {
    element: <AuthLayout.Page />,
    loader: AuthLayout.loader,
    errorElement: <AuthLayout.ErrorBoundary />,
    children: [
      {
        path: '/login',
        action: Login.action,
        errorElement: <Login.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <Login.Page />
          </Suspense>
        ),
      },
    ],
  },
];

// DashboardRoutes
import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DashboardLayout from './src/_dashboard';
import * as Dashboard from './src/_dashboard.dashboard';
import BrandingRoutes from './src/BrandingRoutes';

export const DashboardRoutes: RouteObject[] = [
  {
    element: <DashboardLayout.Page />,
    loader: DashboardLayout.loader,
    errorElement: <DashboardLayout.ErrorBoundary />,
    children: [
      {
        path: '/dashboard',
        errorElement: <Dashboard.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <Dashboard.Page />
          </Suspense>
        ),
      },
      ...BrandingRoutes,
    ],
  },
];

// BrandingRoutes
import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteBranding from './src/_dashboard.branding.$id.delete';
import * as EditBranding from './src/_dashboard.branding.$id.edit';
import * as BrandingList from './src/_dashboard.branding._index';
import * as CreateBranding from './src/_dashboard.branding.create';

const BrandingRoutes: RouteObject[] = [
  {
    path: '/branding',
    loader: BrandingList.loader,
    shouldRevalidate: BrandingList.shouldRevalidate,
    errorElement: <BrandingList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <BrandingList.Page />
      </Suspense>
    ),
  },
  {
    path: '/branding/:id/edit',
    action: EditBranding.action,
    shouldRevalidate: EditBranding.shouldRevalidate,
    errorElement: <EditBranding.ErrorBoundary />,
  },
  {
    path: '/branding/create',
    action: CreateBranding.action,
    errorElement: <CreateBranding.ErrorBoundary />,
  },
  {
    path: '/branding/:id/delete',
    action: DeleteBranding.action,
  },
];

export default BrandingRoutes;

```

## Migrate base hook

### RemixJS

##### `useListingData`

```typescript
import { GetTypeOfSearchParamsFromUrlParamsUtils } from "RemixJS/client";
import { SimpleListingResponse } from "RemixJS/client";
import { SimpleActionResponse } from "RemixJS/client";
import { useListingData } from "RemixJS/client";
```

### React router dom

##### `useListingData`

Clone `useListingData` from `RemixJS/client` lib to this app

```typescript
// packages/base/hooks/useListingData.tsx
import { isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { notification } from "ReactJS";
import { AnyRecord } from "TypescriptUtilities";
import { SimpleListingResponse } from "../types/SimpleListingResponse";
import { useSearchParams, type useFetcher, type useLoaderData } from "~/overrides/remix";

interface UseListingData<T extends AnyRecord> {
  loaderData: ReturnType<typeof useLoaderData<SimpleListingResponse<T>>>;
  fetcherData: ReturnType<typeof useFetcher<SimpleListingResponse<T>>>;
  getNearestPageAvailable: (page: number) => void;
}

export const useListingData = <T extends AnyRecord>({ loaderData, fetcherData, getNearestPageAvailable }: UseListingData<T>) => {
  const [data, setData] = useState(loaderData);
  const [currentSearchParams] = useSearchParams();

  const isFetchingList = useMemo(() => {
    return fetcherData.state === "loading" || fetcherData.state === "submitting";
  }, [fetcherData.state]);

  useEffect(() => {
    if (fetcherData.data) {
      if (isEmpty(fetcherData.data.info.hits) && !!currentSearchParams.get("page") && currentSearchParams.get("page") !== fetcherData.data.page.toString()) {
        getNearestPageAvailable(fetcherData.data.page);
      } else {
        setData(fetcherData.data);
      }
      if (typeof fetcherData.data.toastMessageError === "string") {
        notification.error({
          message: fetcherData.data?.toastMessageError,
          description: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData.data]);

  useEffect(() => {
    if (loaderData) {
      if (isEmpty(loaderData.info.hits) && !!currentSearchParams.get("page") && currentSearchParams.get("page") !== loaderData.page.toString()) {
        getNearestPageAvailable(loaderData.page);
      } else {
        setData(loaderData);
      }
    }
    if (loaderData.toastMessageError) {
      notification.error({
        message: loaderData.toastMessageError,
        description: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return {
    data,
    isFetchingList,
  };
};

// packages/base/types/SimpleActionResponse.ts
import { AnyRecord } from "TypescriptUtilities";

export type SimpleActionResponse<T, FormValues extends AnyRecord, Extra extends AnyRecord = AnyRecord> = Extra & {
  message: string;
  hasError: boolean;
  info: T | undefined;
  fieldsError?: FieldsErrorOfForm<FormValues>;
};

// packages/base/types/SimpleListingResponse.ts
import { AnyRecord } from "TypescriptUtilities";

export type SimpleListingResponse<Model extends AnyRecord, Extra extends AnyRecord = AnyRecord> = Extra & {
  info: {
    hits: Model[];
    pagination: {
      totalRecords: number;
      totalPages: number;
    };
  };
  page: number;
  toastMessageError?: string;
};

// packages/base/types/GetTypeOfSearchParamsFromUrlParamsUtils.ts
import { GetGeneric } from "TypescriptUtilities";
import { UrlSearchParamsUtils } from "utilities";
import { TypeOf } from "zod";

export type GetTypeOfSearchParamsFromUrlParamsUtils<T extends UrlSearchParamsUtils<any>> = TypeOf<
  // @ts-ignore
  GetGeneric<Exclude<T["_zodSchema"], undefined>>
>;
```
