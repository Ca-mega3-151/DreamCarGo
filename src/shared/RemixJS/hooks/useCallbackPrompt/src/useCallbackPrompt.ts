import { BlockerFunction, useBlocker } from '@remix-run/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useBeforeUnload } from '~/shared/ReactJS';

interface UseCallbackPrompt {
  /**
   * Function to handle blocking for Remix Router.
   * Should conform to the `BlockerFunction` type.
   */
  whenEnableForRemixRouter: BlockerFunction /**
   * Function to check whether the prompt should be enabled for the browser.
   * Returns a boolean indicating the state.
   */;
  whenEnableForBrowser: () => boolean;
}

/**
 * Custom React hook to show a warning popup when the user tries to leave the page via Remix Router or browser actions.
 * @param {Object} options - Configuration options.
 * @param {Function} options.whenEnableForRemixRouter - Function to determine if the prompt should be enabled for Remix Router navigation.
 * @param {Function} options.whenEnableForBrowser - Function to determine if the prompt should be enabled for browser actions.
 * @returns {Object} - Returns an object with the following methods:
 * @returns {Function} showPrompt - Function to programmatically trigger the prompt.
 * @returns {Function} confirmNavigation - Function to programmatically confirm navigation.
 * @returns {Function} cancelNavigation - Function to programmatically cancel navigation.
 * @example
 * ```jsx
 * const { showPrompt, confirmNavigation, cancelNavigation } = useCallbackPrompt({ whenEnableForRemixRouter: () => true, whenEnableForBrowser: () => true });
 * ...
 * <DialogBox
 *   showDialog={showPrompt}
 *   confirmNavigation={confirmNavigation}
 *   cancelNavigation={cancelNavigation}
 * />
 * ```
 */
export const useCallbackPrompt = ({
  whenEnableForBrowser,
  whenEnableForRemixRouter,
}: UseCallbackPrompt): {
  showPrompt: boolean;
  setShowPrompt: Dispatch<SetStateAction<boolean>>;
  confirmNavigation: () => void;
  cancelNavigation: () => void;
} => {
  const [showPrompt, setShowPrompt] = useState(false);

  const blocker = useBlocker(whenEnableForRemixRouter);

  // Set to default if cancel navigation
  const cancelNavigation = (): void => {
    setShowPrompt(false);
  };

  // Set to default and run previous blocker if redirect
  const confirmNavigation = (): void => {
    blocker.proceed?.();
  };

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setShowPrompt(true);
    }
  }, [blocker]);

  useBeforeUnload({ enabled: whenEnableForBrowser });

  return {
    showPrompt,
    setShowPrompt,
    confirmNavigation,
    cancelNavigation,
  };
};
