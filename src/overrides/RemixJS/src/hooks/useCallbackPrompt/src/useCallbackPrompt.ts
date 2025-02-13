import { useEffect, useState } from 'react';
import { useBlocker, BlockerFunction } from 'react-router-dom';
import { useBeforeUnload } from '~/shared/ReactJS';

interface UseCallbackPrompt {
  whenEnableForReactRouter: BlockerFunction;
  whenEnableForBrowser: () => boolean;
  autoClose?: boolean;
}

export const useCallbackPrompt = ({
  whenEnableForReactRouter,
  whenEnableForBrowser,
  autoClose = false,
}: UseCallbackPrompt) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const blocker = useBlocker(({ currentLocation, historyAction, nextLocation }) => {
    return whenEnableForReactRouter({ currentLocation, historyAction, nextLocation });
  });

  // Set to default if cancel navigation
  const cancelNavigation = (): void => {
    setShowPrompt(false);
    blocker.reset?.();
  };

  // Set to default and run previous blocker if redirect
  const confirmNavigation = (): void => {
    if (autoClose) {
      setShowPrompt(false);
    }
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
    confirmNavigation,
    cancelNavigation,
  };
};
