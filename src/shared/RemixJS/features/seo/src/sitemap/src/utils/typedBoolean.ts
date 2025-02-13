/**
 * Checks if the value is a typed boolean.
 * @template T - The type of the value being checked.
 * @param {T} value - The value to be checked.
 * @returns {boolean} Returns true if the value is a typed boolean, false otherwise.
 */
export const typedBoolean = <T>(value: T): value is Exclude<T, '' | 0 | false | null | undefined> => {
  return Boolean(value);
};
