import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useIsMounted } from '../../../../../../hooks';
import { useFixSSRContext } from '../../../helpers/FixSSR';

interface State {
  ready: boolean;
  isSSR: boolean;
}

const InitializeContext = createContext<State>({ ready: false, isSSR: false });

/**
 * This hook ensures that the components of "AntCustom" using it is within the ThemeProvider.
 * If the context is undefined, it throws an error indicating that the component is not correctly placed within the AntCustom structure.
 */
export const useInitializeContext = (): State | undefined => {
  const context = useContext(InitializeContext);
  if (typeof context === 'undefined') {
    console.error(
      `Components of "AntCustom" module must be used within the ThemeProvider from AntCustom. Make sure your component is wrapped with ThemeProvider.`,
    );
  }
  return context ?? undefined;
};

interface Props extends PropsWithChildren {
  isSSR: boolean;
}
/**
 * Components from the `AntCustom` library should be wrapped with this provider to ensure they have access to the required context.
 */
export const InitializeProvider: FC<Props> = ({ children, isSSR }) => {
  useFixSSRContext({ isSSR });
  const isMounted = useIsMounted();

  return (
    <InitializeContext.Provider
      value={{
        ready: isMounted,
        isSSR,
      }}
    >
      {children}
    </InitializeContext.Provider>
  );
};
