/**
 * Cancels an animation frame request.
 *
 * @param {number | null} timer - The ID of the animation frame request as returned by `requestAnimationFrame`.
 *                                If `null`, no action is taken.
 * @returns {void}
 */
export const caf = (timer: number | null): void => {
  if (typeof window.cancelAnimationFrame === 'function' && timer) {
    window.cancelAnimationFrame(timer);
  } else {
    if (timer) {
      clearTimeout(timer);
    }
  }
};
