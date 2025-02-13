import { useEffect } from 'react';

export interface UseWindowReactive {
  /**
   * Determines if the event listeners should be enabled.
   * If false, the listeners will be removed.
   * @default true
   */
  enabled?: boolean;

  /**
   * The callback function to be executed when the window is focused or visibility changes.
   */
  callback: () => void;
}

/**
 * Custom hook that revalidates on window focus and visibility change events.
 *
 * @param {UseWindowReactive} param - The parameters for the hook.
 * @param {boolean} [param.enabled=true] - Determines if the event listeners should be enabled.
 * @param {() => void} param.callback - The callback function to be executed on event triggers.
 *
 * @example
 * useWindowReactive({ enabled: true, callback: () => console.log('Window event triggered') });
 */
export const useWindowReactive = ({ enabled = true, callback }: UseWindowReactive): void => {
  const handleFocus = (): void => {
    callback();
  };

  const handleVisibilityChange = (): void => {
    callback();
  };

  useEffect(() => {
    if (!enabled) {
      window.removeEventListener('focus', handleFocus);
      return;
    }
    window.addEventListener('focus', handleFocus);
    return () => {
      return window.removeEventListener('focus', handleFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      return;
    }
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      return window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
};
