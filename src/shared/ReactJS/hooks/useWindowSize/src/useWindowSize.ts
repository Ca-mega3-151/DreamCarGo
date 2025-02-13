import { useEffect, useMemo, useState } from 'react';
import { getWindow } from './utils/getWindow';
import { createResizeObserver } from '~/shared/Utilities';

/**
 * React hook that returns the current window's width and height.
 * It listens to window resize events and updates the dimensions accordingly.
 *
 * @function
 * @returns {Object} An object containing the dimensions of the window.
 * @property {number} width - The current width of the window.
 * @property {number} height - The current height of the window.
 * @example ```typescript
  const { width, height } = useWindowSize();
  console.log(`Current window dimensions: ${width}x${height}`);
  ```
 */
export const useWindowSize = (): { width: number; height: number } => {
  const [state, setState] = useState(getWindow);
  const resizeObsever = useMemo(createResizeObserver, []);

  const handleResize = (): void => {
    setState(getWindow);
  };

  useEffect(() => {
    resizeObsever.addListener(handleResize);
    return () => {
      resizeObsever.removeListener(handleResize);
    };
  }, [resizeObsever]);

  return state;
};
