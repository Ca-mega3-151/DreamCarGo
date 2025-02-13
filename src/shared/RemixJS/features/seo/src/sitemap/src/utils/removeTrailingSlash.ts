/**
 * Removes the trailing slash from a given string.
 * @param {string} s - The input string.
 * @returns {string} The string with trailing slash removed, if present.
 */
export const removeTrailingSlash = (s: string): string => {
  return s.endsWith('/') ? s.slice(0, -1) : s;
};
