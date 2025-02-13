import { DependencyList, useEffect, useMemo } from 'react';
import { createResizeObserver } from '~/shared/Utilities';

type Effect = () => void;

/**
 * A React hook to handle resize events.
 *
 * This hook uses a utility that creates an object with methods to add or remove resize listeners.
 * It supports attaching listeners to specific elements via ResizeObserver,
 * or falls back to using the window's resize event listener if necessary.
 *
 * The effect is only rerun if the values in the dependency array change, similar to useEffect.
 *
 * @param {Effect} effect - A callback function that is executed when the resize event occurs.
 *                          This callback should be a React effect function, which follows the same
 *                          rules as useEffect (e.g., cleanup and dependency array).
 * @param {Array} dependencies - An array of dependencies that the effect depends on.
 *                               The effect will only re-run if these dependencies change.
 * @returns {void}
 */
export const useResizeEvent = (effect: Effect, dependencies: DependencyList = []): void => {
  const resizeObserver = useMemo(() => {
    return createResizeObserver();
  }, []);

  useEffect(() => {
    resizeObserver.addListener(effect);
    return (): void => {
      resizeObserver.removeListener(effect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeObserver, effect, ...dependencies]);
};
