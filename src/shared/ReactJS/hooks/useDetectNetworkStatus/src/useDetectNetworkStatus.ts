import { useState } from 'react';
import { useMount } from '../../useMount';

/**
 * Hook that detects and tracks the network status of the client, indicating whether it's online or offline.
 *
 * @returns {object} Object containing the online status of the client.
 * @property {boolean} isOnline - A boolean indicating whether the client is currently online or offline.
 *
 * @example ```typescript
  const { isOnline } = useDetectNetworkStatus();
  console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
  ```
 */
export const useDetectNetworkStatus = (): { isOnline: boolean } => {
  const [isOnlineState, setIsOnlineState] = useState(navigator.onLine);

  const updateOnlineStatus = (): void => {
    const isOnline = navigator.onLine;
    setIsOnlineState(isOnline);
  };

  useMount(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  });

  return { isOnline: isOnlineState };
};
