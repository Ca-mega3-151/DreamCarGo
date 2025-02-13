# Overview

The `getInitialNamespaces` function serves the purpose of retrieving the list of namespaces employed by the application server-side. This list is valuable for configuring i18next initialization options dynamically. By utilizing this function, developers can ensure that i18n namespaces are appropriately set within the i18next initialization, facilitating efficient internationalization (i18n) support for the application's server-side rendering.

# Usage

```typescript
// i18n.client.ts
import { i18n } from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "...";
import * as i18nConfig from "...";

export const initRemixI18n = async (i18next: i18n) => {
  await i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(I18nextBrowserLanguageDetector) // Setup a client-side language detector
    .init({
      ...i18nConfig,
      ns: getInitialNamespaces(), // This function
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

// entry.client.tsx
import { RemixBrowser } from '@remix-run/react';
import i18next from 'i18next';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { initRemixI18n } from '..';

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
```
