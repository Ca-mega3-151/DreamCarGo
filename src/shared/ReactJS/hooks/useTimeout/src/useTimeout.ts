import { useRef } from 'react';
import { useDeepCompareEffect } from '../../useDeepCompareEffect';
import { useIsomorphicLayoutEffect } from '../../useIsomorphicLayoutEffect';

type IntervalCallback = () => void;
type IntervalDelay = number | null;

/**
 * A custom React hook that invokes a function after a specified timeout delay.
 * If the delay is null, the timeout is cancelled.
 *
 * @param {IntervalCallback} callback - The function that will be called after the delay. It should not
 *                                      update component state directly if it's declared outside of the `useTimeout`
 *                                      callback to avoid closure issues with stale state.
 * @param {IntervalDelay} delay - The delay in milliseconds after which to invoke the callback. If the value is null,
 *                                any existing timeout will be cleared, effectively cancelling the timeout.
 * @returns {void} This hook does not return anything.
 *
 * @example
 * useTimeout(() => {
 *   // Code to execute after the delay
 * }, 1000);
 *
 * // If you want to cancel the timeout, you can pass null as the delay:
 * useTimeout(() => {
 *   // This will not be executed as the delay is null
 * }, null);
 */
export const useTimeout = (callback: IntervalCallback, delay: IntervalDelay): void => {
  const savedCallback = useRef(callback);

  // Need to use a layout effect to force the saved callback to be synchronously updated during a commit
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useDeepCompareEffect(() => {
    const tick = (): void => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => {
        return clearTimeout(id);
      };
    }

    return undefined;
  }, [delay]);
};
