/**
 * Requests an animation frame and executes the provided callback function.
 *
 * This function is a wrapper around the `requestAnimationFrame` API, used
 * to schedule the animation of visual updates. It takes a callback function
 * which will be executed before the next repaint.
 *
 * @param {() => void} fn - The callback function to be executed before the next repaint.
 *                          This function should not take any arguments and does not return a value.
 * @returns {number} The request ID, a unique identifier for the request which can be used
 *                   with `cancelAnimationFrame` to cancel the request.
 */
export const raf = (fn: () => void): number => {
  if (typeof window.requestAnimationFrame === 'function') {
    return window.requestAnimationFrame(fn);
  } else {
    return window.setTimeout(fn, 0);
  }
};
