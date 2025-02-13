import { DependencyList, useCallback } from 'react';
import { useDeepCompareMemoize } from '../../useDeepCompareMemoize';

/**
 * `useDeepCompareCallback` is a custom hook that memoizes a callback function with deep comparison of the dependencies.
 * Usage note: only use this if `deps` are objects or arrays that contain objects. Otherwise you should just use React.useMemo.
 * @template T Callback function type.
 * @param {T} callback - The callback function to be memoized.
 * @param {React.DependencyList} dependencies - An array of dependencies for which the memoization will be deep compared.
 * @returns {T} - Returns the memoized callback function.
 *
 * @example ```typescript
  const memoizedCallback = useDeepCompareCallback(() => {
    console.log('Callback is called');
  }, [complexDependency]);
  ```
 */
export const useDeepCompareCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: DependencyList,
): ReturnType<typeof useCallback<T>> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback<T>(callback, useDeepCompareMemoize(dependencies));
};
