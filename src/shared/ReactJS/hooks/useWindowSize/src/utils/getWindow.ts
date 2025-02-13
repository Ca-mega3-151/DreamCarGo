import { isBrowser } from '~/shared/Utilities';

/**
 * Gets the current window's width and height.
 *
 * @function
 * @returns {Object} An object containing the dimensions of the window.
 * @property {number} width - The width of the window.
 * @property {number} height - The height of the window.
 * @example ```typescript
  const { width, height } = getWindow();
  console.log(`Window dimensions: ${width}x${height}`);
  ```
 */
export const getWindow = (): { width: number; height: number } => {
  if (!isBrowser()) {
    return { height: 0, width: 0 };
  }
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return { height, width };
};
