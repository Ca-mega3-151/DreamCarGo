import { dequal } from 'dequal';
import { DependencyList, useRef } from 'react';

/**
 * Custom hook that performs a deep comparison on the provided dependencies and returns a memoized version
 * of the dependencies.
 *
 * @param {DependencyList} value An array of dependencies to be deeply compared and memoized.
 *
 * @returns {DependencyList} A memoized dependency list that only changes if a deep comparison indicates changes.
 */
export const useDeepCompareMemoize = (value: DependencyList): DependencyList => {
  const ref = useRef<DependencyList>([]);

  if (!dequal(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};
