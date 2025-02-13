import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useIsMounted } from '../../../../../../../../hooks';

const FixSSRContext = createContext<boolean | undefined>(undefined);

export class AntFixSSRError extends Error {
  constructor() {
    super();
    this.message =
      'Ant Design SSR setup failed. Make sure to wrap your application with the `ImplicitFixSSR` or `ExplicitFixSSR` component from the `FixSSR` module. These components are necessary to handle Ant Design’s SSR issues and ensure proper CSS hydration and rendering.';
  }
}

interface UseFixSSRContext {
  isSSR: boolean;
}
export const useFixSSRContext = ({ isSSR }: UseFixSSRContext): void => {
  const context = useContext(FixSSRContext);

  if (isSSR && typeof context === 'undefined') {
    throw new AntFixSSRError();
  }
};

export const FixSSRProvider: FC<PropsWithChildren> = ({ children }) => {
  const isMounted = useIsMounted();

  return <FixSSRContext.Provider value={isMounted}>{children}</FixSSRContext.Provider>;
};
