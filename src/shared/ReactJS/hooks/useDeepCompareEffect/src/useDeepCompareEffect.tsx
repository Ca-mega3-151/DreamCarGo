import { DependencyList, EffectCallback, useEffect } from 'react';
import { useDeepCompareMemoize } from '../../useDeepCompareMemoize';

/**
 * `useDeepCompareEffect` is a custom hook similar to `useEffect` but with deep comparison
 * of the dependencies list.
 * Usage note: only use this if `deps` are objects or arrays that contain objects. Otherwise you should just use React.useMemo.
 *
 * @param {React.EffectCallback} effect - A function that contains imperative, possibly
 *    effectful code. This function will be deep compared against changes in the dependencies list.
 * @param {React.DependencyList} dependencies - An array of dependencies for which the effect
 *    will be executed when there are deep changes.
 * @returns {void}
 *
 * @example
 * useDeepCompareEffect(() => {
 *   // Some effectful logic here...
 * }, [complexDependency]);
 */
export const useDeepCompareEffect = (effect: EffectCallback, dependencies: DependencyList): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(dependencies));
};
