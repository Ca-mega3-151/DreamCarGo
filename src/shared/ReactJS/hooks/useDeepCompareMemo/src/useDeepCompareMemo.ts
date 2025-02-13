import { useMemo } from 'react';
import { useDeepCompareMemoize } from '../../useDeepCompareMemoize';

/**
 * A custom React hook that memoizes the result of a factory function based on deep comparison of its dependencies.
 * This hook is similar to `React.useMemo`, but it uses deep comparison instead of reference equality to determine if dependencies have changed.
 * Usage note: only use this if `deps` are objects or arrays that contain objects. Otherwise you should just use React.useMemo.
 *
 * @template T - The type of the value returned by the factory function.
 * @param {() => T} factory - A function that returns a value to be memoized.
 * @param {React.DependencyList} dependencies - An array of dependencies to determine when the memoized value should be recomputed.
 * @returns {T} - Returns the memoized value.
 *
 * @example ```typescript
  const expensiveValue = useDeepCompareMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```
 */
export const useDeepCompareMemo = <T>(factory: () => T, dependencies: React.DependencyList): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, useDeepCompareMemoize(dependencies));
};
