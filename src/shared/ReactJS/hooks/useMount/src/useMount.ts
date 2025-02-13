import { useEffect } from 'react';

/**
 * Custom React hook that runs a callback function when the component mounts.
 *
 * @param callback - Function to be called when the component mounts.
 */
export const useMount = (callback: () => void | (() => void)): void => {
  useEffect(() => {
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
