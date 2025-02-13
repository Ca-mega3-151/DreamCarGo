/**
 * Detects the presence of hour, minute, and second components in a given time format string.
 *
 * @param {string} format - The time format string to be analyzed.
 * @returns {{ hasHour: boolean; hasMinute: boolean; hasSecond: boolean }} An object indicating the presence of hour, minute, and second components in the format string.
 */
export const detectTimeComponents = (format: string): { hasHour: boolean; hasMinute: boolean; hasSecond: boolean } => {
  return {
    hasHour: /H/.test(format),
    hasMinute: /m/.test(format),
    hasSecond: /s/.test(format),
  };
};
