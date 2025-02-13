import { FC, PropsWithChildren } from 'react';
import { useIsMounted } from '../../../../../../../../hooks';
import { FixSSRProvider } from '../../FixSSRContext';

/**
 * The ExplicitFixSSR component addresses the issue where Ant Design will crash the SSR app if hydration fails due to mismatched or missing CSS.
 *
 * This resolver utilizes `@ant-design/static-style-extract` to fix the issue. By following the documentation provided here:
 * https://ant.design/docs/react/server-side-rendering#whole-export
 *
 * This resolver does not display a loading screen because the CSS is initialized during the build phase, preventing any UI flash.
 * However, it does not thoroughly resolve the issue of the app crashing due to hydration failures.
 *
 * If you want to detach a style file into a CSS file, try the following schemes:
 * 1. Install the required dependencies:
 *    ```sh
 *    npm install ts-node tslib cross-env --save-dev
 *    ```
 * 2. Add a `tsconfig.node.json` file with the following content:
 *    ```json
 *    {
 *      "compilerOptions": {
 *        "strictNullChecks": true,
 *        "module": "NodeNext",
 *        "jsx": "react",
 *        "esModuleInterop": true
 *      },
 *      "include": ["next-env.d.ts", "**\/*.ts", "**\/*.tsx"]
 *    }
 *    ```
 * 3. Add a `scripts/genAntdCss.tsx` file:
 *    ```tsx
 *    // scripts/genAntdCss.tsx
 *    import fs from 'fs';
 *    import { extractStyle } from '@ant-design/static-style-extract';
 *
 *    const outputPath = './public/antd.min.css';
 *
 *    const css = extractStyle();
 *
 *    // const css = extractStyle((node) => (
 *    //     <>
 *    //     <ConfigProvider
 *    //         theme={{
 *    //         token: {
 *    //             colorBgBase: testGreenColor,
 *    //         },
 *    //         }}
 *    //     >
 *    //         {node}
 *    //     </ConfigProvider>
 *    //     <ConfigProvider
 *    //         theme={{
 *    //         token: {
 *    //             colorPrimary: testGreenColor,
 *    //         },
 *    //         }}
 *    //     >
 *    //         <ConfigProvider
 *    //         theme={{
 *    //             token: {
 *    //             colorBgBase: testRedColor,
 *    //             },
 *    //         }}
 *    //         >
 *    //         {node}
 *    //         </ConfigProvider>
 *    //     </ConfigProvider>
 *    //     </>
 *    // ));
 *
 *    fs.writeFileSync(outputPath, css);
 *    ```
 * 4. Import the generated CSS file into your Remix app:
 *    ```js
 *    import antdCss from './css/antd.min.css';
 *    ...
 *    export const links: LinksFunction = () => [
 *      { rel: 'stylesheet', href: antdCss },
 *      { rel: 'stylesheet', href: antdResetCssfrom },
 *      { rel: 'stylesheet', href: tailwindCss },
 *      ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
 *      ......
 *    ];
 *    ```
 *
 * @returns {JSX.Element} The rendered ExplicitFixSSR component.
 */
export const ExplicitFixSSR: FC<PropsWithChildren> = ({ children }) => {
  const isMounted = useIsMounted();

  return <FixSSRProvider key={Number(isMounted)}>{children}</FixSSRProvider>;
};
