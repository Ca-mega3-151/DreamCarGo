import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { useMount } from '../../../../hooks';
import { isBrowser } from '~/shared/Utilities';

export interface Props extends PropsWithChildren {
  skeleton?: ReactNode;
}

export const ClientSideOnly: FC<Props> = ({ children, skeleton = null }) => {
  const [isClient, setIsClient] = useState(false);

  useMount(() => {
    setIsClient(isBrowser());
  });

  if (!isClient) {
    return skeleton;
  }

  return children;
};
