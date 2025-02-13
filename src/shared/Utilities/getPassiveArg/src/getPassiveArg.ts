/**
 * Retrieves the appropriate passive argument based on the browser's support for passive event listeners.
 * Inspired by https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 * Optimize performance demonstrate: https://www.youtube.com/watch?v=NPM6172J22g
 */
export const getPassiveArg = (): typeof passiveArg => {
  // Inspired by https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
  let passiveArg: AddEventListenerOptions | undefined = undefined;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        passiveArg = {
          passive: true,
        };
      },
    });
    const emptyHandler = (): void => {
      return;
    };
    window.addEventListener('testPassive', emptyHandler, opts);
    window.removeEventListener('testPassive', emptyHandler, opts);
  } catch (e) {
    /** */
  }
  return passiveArg;
};
