/**
 * Sanitizes a string by escaping HTML special characters to prevent XSS attacks.
 *
 * The function replaces the following characters:
 * - `&` with `&amp;`
 * - `<` with `&lt;`
 * - `>` with `&gt;`
 * - `"` with `&quot;`
 * - `'` with `&#039;`
 *
 * @param {string} str - The input string that may contain HTML special characters.
 * @returns {string} The sanitized string with HTML special characters escaped.
 */
export const sanitizeHTML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
