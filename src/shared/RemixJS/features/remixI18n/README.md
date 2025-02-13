# Overview

`remixI18n` is allowing you to easily way to translate your Remix apps.

# ⚠️ Warning: Considerations when using JSON i18n files

When opting to use JSON files for internationalization (i18n), it's essential to weigh the advantages and disadvantages they bring to your application.

### Pros:

- **Lazy Loading and Separation**: JSON files allow for lazy loading and can be separated into multiple files, which can be advantageous for optimizing performance and managing translations efficiently.

### Cons:

1. **Lack of Type Safety**: While JSON files provide safety for the keys of namespaces, they do not offer type safety for variables within strings. Developers must ensure proper handling and validation of variables used in translations to prevent runtime errors.

2. **Server-Side Rendering Considerations**: When implementing server-side rendering (SSR), it's crucial to ensure that all i18n data is loaded before rendering the page. Failure to do so may lead to hydration errors. For instance, with libraries like Ant Design (antd), an application may crash if hydration errors occur. Other UI libraries may result in rendering the UI twice, once without i18n data and once with i18n data.

3. **Deployment with Serverless or Other Services**: When deploying applications with serverless architectures or other services like Vercel, be aware that locales stored in public folders may not be loaded correctly. Serverless environments often build and deploy applications to different directories, potentially causing issues with loading i18n data from the expected locations.

### Additional Considerations:

- **Lazy Loading Redundancy**: In TypeScript applications, all files will typically be loaded on render, making lazy loading of JSON i18n files seem redundant. Evaluate whether lazy loading provides significant benefits in your specific use case.

- **Cache for Performance**: Instead of relying solely on lazy loading, consider implementing caching mechanisms to cache locales and improve performance. Caching can help reduce unnecessary network requests and enhance the overall user experience.

Carefully consider these factors when deciding to use JSON i18n files in your TypeScript-enabled application. It's essential to mitigate potential issues and ensure a smooth user experience across all deployment environments.

# Usage

```typescript
// i18n/config/locales/translation.ts
export const translation = {
  en: {
    title: "remix-i18next (en) {{ name }}",
    description: "A Remix + Vite + remix-i18next example",
  },
  es: {
    title: "remix-i18next (es) {{ name }}",
    description: "Un ejemplo de Remix + Vite + remix-i18next",
  },
} as const;

// i18/config/i18n.ts
import { translation } from "./locales/translation";

// This is the list of languages your application supports
export const supportedLngs = ["es", "en"];

// This is the language you want to use in case if the user language is not in the supportedLngs
export const fallbackLng = "en";

// The default namespace of i18next is "translation", but you can customize it here
/**
 * WARNING: Cause i18next typesafe can be slow with larger number of language resource keys
 * ==> Resources should be like that
  const resources = {
    translation: {
      en: {
        ...Import i18n of page 1,
        ...Import i18n of page 2,
        ...
      },
      es: {
        ...Import i18n of page 1,
        ...Import i18n of page 2,
        ...
      }
    } as const
  };
 * We will have 2 pros when use this format:
    1. Typescript complier will run faster
    2. i18next can safe type of variables in string
 */
export const defaultNS = "translation";

export const resources = {
  ...translation,
};

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: (typeof translation)["en"];
    };
  }
}

// i18n/i18n.client.ts
import { i18n } from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "~/shared/RemixJS/client";
import * as i18nConfig from "~/packages/I18n/config/i18n";

export const initRemixI18n = async (i18next: i18n) => {
  await i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(I18nextBrowserLanguageDetector) // Setup a client-side language detector
    .init({
      ...i18nConfig,
      ns: getInitialNamespaces(),
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ["htmlTag"],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
    });
};

// i18n/i18n.server.ts
import { EntryContext, createCookie } from "@remix-run/node";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { RemixServerI18next } from "~/shared/RemixJS/server";
import * as i18n from "~/packages/I18n/config/i18n";

export const localeCookie = createCookie("i18n", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

export const i18nServer = new RemixServerI18next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
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
    ...i18n,
    lng,
    ns,
  });

  return instance;
};

// entry.client.ts
import { RemixBrowser } from '@remix-run/react';
import i18next from 'i18next';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { initRemixI18n } from './packages/I18n/i18n.client';

async function main() {
  await initRemixI18n(i18next);

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

main().catch(error => console.error(error));

// entry.server.ts
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { PassThrough } from 'node:stream';
import { initRemixI18n } from './packages/I18n/i18n.server';
import { EntryContext } from '@remix-run/node';

const ABORT_DELAY = 5_000;

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const i18nInstance = await initRemixI18n({ remixContext, request });
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
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const i18nInstance = await initRemixI18n({ remixContext, request });

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
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
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return isbot(request.headers.get('user-agent') ?? '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

// root.tsx
import { cssBundleHref } from '@remix-run/css-bundle';
import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { FC } from 'react';
import { useChangeLanguage } from '~/shared/RemixJS/client';
import { i18nServer, localeCookie } from './packages/I18n/i18n.server';
import styles from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json({ locale }, { headers: { 'Set-Cookie': await localeCookie.serialize(locale) } });
}

const App: FC = () => {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);

  return (
    <html lang={locale}>
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

// routes/_index.tsx
import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '~/shared/RemixJS/client';
import { i18nServer } from '~/packages/I18n/i18n.server';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  return json({ description: t('description') });
}

export default function Index() {
  const { t } = useTranslation(['translation']);
  const { description } = useLoaderData<typeof loader>();

  const locale = useLocale();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>{t('translation:title')}</h1>
      <p>{description}</p>
      <p>{locale}</p>
      <Form>
        <button type="submit" name="lang" value="es">
          Español
        </button>
        <button type="submit" name="lang" value="en">
          English
        </button>
      </Form>
    </div>
  );
}
```
