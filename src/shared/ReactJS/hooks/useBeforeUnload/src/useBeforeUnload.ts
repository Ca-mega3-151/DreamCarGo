import { useCallback, useEffect } from 'react';

export interface UseBeforeUnload {
  /**
   * Function that determines if the before unload prompt should be shown.
   * Should return a boolean.
   */
  enabled: () => boolean;
  /**
   * Optional message to be displayed in the before unload prompt.
   * If not provided, the default browser message will be used.
   */
  message?: string;
}
export const useBeforeUnload = ({ enabled, message }: UseBeforeUnload): void => {
  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!enabled()) {
        return;
      }

      event.preventDefault();

      if (message) {
        event.returnValue = message;
      }

      return message;
    },
    [enabled, message],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, handleBeforeUnload]);
};
