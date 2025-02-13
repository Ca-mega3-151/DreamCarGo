import { useRef } from 'react';
import { useDeepCompareEffect } from '../../useDeepCompareEffect';

/**
 * A custom React hook that stores and returns the previous value of a variable.
 * It captures the value passed to it on the previous render of the component.
 *
 * @template T The type of value you want to keep track of.
 * @param {T} value The current value for which you want to retain the previous one.
 * @returns {T | undefined} The previous value of the variable. On the initial render, it will return `undefined`
 *                          since there is no previous render at this point.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const previousCount = usePrevious(count);
 *
 * // Now you can use `previousCount` to access the count value from the previous render
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useDeepCompareEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
