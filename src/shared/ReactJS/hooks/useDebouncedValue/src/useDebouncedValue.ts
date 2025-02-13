import { useRef, useState } from 'react';
import { useDeepCompareEffect } from '../../useDeepCompareEffect';

interface DebouncedOptions {
  /** The amount of time, in milliseconds, to delay the debounced value. */
  timeoutMs?: number;
}

/**
 * Provides a debounced value of the given input. The debounced value will only reflect the latest value
 * if no changes have been made within the specified timeout duration.
 *
 * @template T The type of the value being debounced.
 * @param {T} value The value to debounce.
 * @param {DebouncedOptions} options Configuration options for the debounce behavior.
 * @param {number} [options.timeoutMs=500] The amount of time, in milliseconds, to delay the debounced value.
 *                                          Defaults to 500ms if not specified.
 * @returns {T} The debounced value, which updates only after the specified timeout has elapsed since the
 *              last change to the input value.
 *
 * @example
 * const [value, setValue] = useState('');
 * const debouncedValue = useDebouncedValue(value, { timeoutMs: 300 });
 *
 * // `debouncedValue` will reflect the latest `value` only if it hasn't changed for at least 300ms.
 */
export const useDebouncedValue = <T>(
  value: T,
  { timeoutMs = 500 }: DebouncedOptions,
): { value: T; clearTimeout: (value?: T) => void } => {
  const [state, setState] = useState<T>(value);
  const stateRef = useRef<T>(state);
  const timeoutRef = useRef<number | NodeJS.Timeout | undefined>(undefined);

  useDeepCompareEffect(() => {
    if (stateRef.current === value) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      stateRef.current = value;
      setState(value);
    }, timeoutMs);

    return (): void => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, timeoutMs]);

  return {
    value: state,
    clearTimeout: value => {
      if (value) {
        setState(value);
      }
      return clearTimeout(timeoutRef.current);
    },
  };
};
