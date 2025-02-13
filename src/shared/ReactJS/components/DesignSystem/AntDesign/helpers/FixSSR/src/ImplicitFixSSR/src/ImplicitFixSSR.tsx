import classNames from 'classnames';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useIsMounted } from '../../../../../../../../hooks';
import { FixSSRProvider } from '../../FixSSRContext';
import './styles.css';

export interface Props {
  /** Indicates if the app is being accessed by a bot. */
  isBot: boolean;
  /** Component to display while waiting for Ant Design setup. */
  LoadingScreen: ReactNode;
  /** The main application component. */
  App: ReactNode;
  /** Optional delay before rendering the App component. */
  delay?: number;
}

/**
 * The ImplicitFixSSR component addresses two specific issues with using Ant Design in a server-side rendered (SSR) application:
 * 1. **CSS in JS**: Ant Design will crash the SSR app if hydration fails due to mismatched or missing CSS.
 * 2. **Initial Render without CSS**: On the first render, the app will not have Ant Design's CSS because it is generated during client-side rendering (CSR), leading to a flash of unstyled content.
 *
 * The ImplicitFixSSR component provides a solution by ensuring the following:
 * 1. If the `isBot` prop is `true`, the DOM is rendered without Ant Design's CSS, which is useful for SEO purposes.
 * 2. A loading screen is displayed until everything is set up for Ant Design. Once set up, the main application component (`App`) is rendered.
 *
 * @param {Props} props - The properties for the component.
 * @param {React.ReactNode} props.App - The main application component.
 * @param {React.ReactNode} props.LoadingScreen - Component to display while waiting for Ant Design setup.
 * @param {boolean} props.isBot - Indicates if the app is being accessed by a bot.
 * @param {number} [props.delay=800] - Optional delay before rendering the App component.
 * @returns {JSX.Element} The rendered ImplicitFixSSR component.
 */
export const ImplicitFixSSR: FC<Props> = ({ App, LoadingScreen, isBot, delay = 800 }) => {
  const isMounted = useIsMounted();
  const [isDelayed, setIsDelayed] = useState(!delay);
  const timeoutRef = useRef<number | NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isDelayed) {
      timeoutRef.current = setTimeout(() => {
        setIsDelayed(true);
      }, delay);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appRenderable = useMemo(() => {
    return isBot || (isMounted && isDelayed);
  }, [isBot, isDelayed, isMounted]);

  return (
    <FixSSRProvider key={`${appRenderable}`}>
      {appRenderable && <div className={classNames('ImplicitFixSSR__App ImplicitFixSSR__fadeInUp')}>{App}</div>}
      {!appRenderable && (
        <div className={classNames('ImplicitFixSSR__LoadingScreen ImplicitFixSSR__fadeIn')}>{LoadingScreen}</div>
      )}
    </FixSSRProvider>
  );
};
