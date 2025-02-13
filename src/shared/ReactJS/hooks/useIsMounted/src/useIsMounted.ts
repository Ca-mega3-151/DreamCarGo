import { useState } from 'react';
import { useMount } from '../../useMount';

/**
 * A custom React hook that returns a boolean value indicating whether the component is mounted.
 * @returns {boolean} A boolean value indicating whether the component is mounted.
 */
export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);
  useMount(() => {
    return setIsMounted(true);
  });
  return isMounted;
};
