/**
 * Debounces a function, ensuring it is only called after a certain delay has passed
 * since the last time it was invoked.
 * @param func The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced function
 */
export const debounce = (func: Function, delay = 300): ((...args: any[]) => void) => {
  let timerId: NodeJS.Timeout | null;

  const debouncedFunction = (...args: any[]): void => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delay);
  };

  return debouncedFunction;
};
