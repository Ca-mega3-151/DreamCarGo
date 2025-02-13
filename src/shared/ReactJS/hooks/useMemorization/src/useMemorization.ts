import { useRef } from 'react';

interface Cache<Value, Condition> {
  condition?: Condition;
  value?: Value;
}

/**
 * `useMemorization` is a custom hook that memoizes and returns a value, based on a condition,
 * and only recalculates the value when the condition changes according to a custom comparison function.
 *
 * @template Value - The type of the value to be memorized.
 * @template Condition - The type of the condition based on which the value is memorized.
 *
 * @param {() => Value} getValue - A function that returns the value to be memorized.
 * @param {Condition} condition - The condition based on which the value should be recalculated.
 * @param {(prev: Condition, next: Condition) => boolean} shouldUpdate - A function that takes the previous and next conditions, and returns a boolean indicating whether the value should be updated.
 *
 * @returns {Value} - Returns the memorized value.
 *
 * @example
 * const memoizedValue = useMemorization(() => computeExpensiveValue(), [dependency1, dependency2], (prev, next) => prev !== next);
 */
export const useMemorization = <Value, Condition = any[]>(
  getValue: () => Value,
  condition: Condition,
  shouldUpdate: (prev: Condition, next: Condition) => boolean,
): Value | undefined => {
  const cacheRef = useRef<Cache<Value, Condition>>({});

  if (!('value' in cacheRef.current) || shouldUpdate(cacheRef.current.condition as Condition, condition)) {
    cacheRef.current.value = getValue();
    cacheRef.current.condition = condition;
  }

  return cacheRef.current.value;
};
