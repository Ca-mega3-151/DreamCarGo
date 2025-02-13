# Overview

This folder contains two components, `ImplicitFixSSR` and `ExplicitFixSSR`, designed to address specific issues when using Ant Design with server-side rendering (SSR).

# Components

## 1. ImplicitFixSSR

The `ImplicitFixSSR` component addresses two specific issues with using Ant Design in an SSR application:

1. **CSS in JS**: Ant Design will crash the SSR app if hydration fails due to mismatched or missing CSS.
2. **Initial Render without CSS**: On the first render, the app will not have Ant Design's CSS because it is generated during client-side rendering (CSR), leading to a flash of unstyled content. This issue can be resolved by using `@ant-design/static-style-extract`. For more details, refer to the [Ant Design documentation](https://ant.design/docs/react/server-side-rendering#whole-export).

The `ImplicitFixSSR` component provides a solution by ensuring the following:

1. If the `isBot` prop is `true`, the DOM is rendered without Ant Design's CSS, which is useful for SEO purposes.
2. A loading screen is displayed until everything is set up for Ant Design. Once set up, the main application component (`App`) is rendered.

## 2. ExplicitFixSSR

The `ExplicitFixSSR` component addresses the issue where Ant Design will crash the SSR app if hydration fails due to mismatched or missing CSS. This resolver uses `@ant-design/static-style-extract` to fix the issue. Refer to the [Ant Design documentation](https://ant.design/docs/react/server-side-rendering#whole-export) for more details.

This resolver does not display a loading screen because the CSS is initialized during the build phase, preventing any UI flash. However, it does not thoroughly resolve the issue of the app crashing due to hydration failures.

If you want to detach a style file into a CSS file, follow these steps:

1. Install the required dependencies:
   ```sh
   npm install ts-node tslib cross-env --save-dev
   ```
2. Add a `tsconfig.node.json` file:
   ```json
   {
     "compilerOptions": {
       "strictNullChecks": true,
       "module": "NodeNext",
       "jsx": "react",
       "esModuleInterop": true
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
   }
   ```
3. Add a `scripts/genAntdCss.tsx` file:

   ```tsx
   // scripts/genAntdCss.tsx
   import fs from "fs";
   import { extractStyle } from "@ant-design/static-style-extract";

   const outputPath = "./public/antd.min.css";

   const css = extractStyle();

   // const css = extractStyle((node) => (
   //     <>
   //     <ConfigProvider
   //         theme={{
   //         token: {
   //             colorBgBase: testGreenColor,
   //         },
   //         }}
   //     >
   //         {node}
   //     </ConfigProvider>
   //     <ConfigProvider
   //         theme={{
   //         token: {
   //             colorPrimary: testGreenColor,
   //         },
   //         }}
   //     >
   //         <ConfigProvider
   //         theme={{
   //             token: {
   //             colorBgBase: testRedColor,
   //             },
   //         }}
   //         >
   //         {node}
   //         </ConfigProvider>
   //     </ConfigProvider>
   //     </>
   // ));

   fs.writeFileSync(outputPath, css);
   ```

4. Import the generated CSS file into your Remix app:
   ```js
   import antdCss from './css/antd.min.css';
   ...
   export const links: LinksFunction = () => [
     { rel: 'stylesheet', href: antdCss },
     { rel: 'stylesheet', href: antdResetCssfrom },
     { rel: 'stylesheet', href: tailwindCss },
     ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
     ......
   ];
   ```
