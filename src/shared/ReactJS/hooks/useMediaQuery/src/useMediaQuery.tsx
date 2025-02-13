import { useState } from 'react';
import { useIsMounted } from '../../useIsMounted';
import { useIsomorphicLayoutEffect } from '../../useIsomorphicLayoutEffect';
import { isBrowser } from '~/shared/Utilities';

interface UseMediaQueryOptions {
  /** The default value to return when the media query is not applicable. Default is `false`. */
  defaultValue?: boolean;
  /** Indicates whether to initialize the hook with the value of the media query. Default is `true`. */
  initializeWithValue?: boolean;
}

/**
 * A custom hook that tracks the state of a media query.
 * @param query The media query string to track.
 * @param options Options for customizing hook behavior.
 * @param options.defaultValue The default value to return when the media query is not applicable.
 * @param options.initializeWithValue Indicates whether to initialize the hook with the value of the media query.
 * @returns A boolean representing whether the media query matches.
 */
export const useMediaQuery = (
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean => {
  const isMounted = useIsMounted();
  /**
   * Gets the current matches state based on the provided media query.
   * @param query The media query string to evaluate.
   * @returns A boolean indicating whether the media query matches.
   */
  const getMatches = (query: string): boolean => {
    if (!isBrowser()) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  // Initialize state with default or initial value
  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  /**
   * Handles the change event of the media query.
   */
  const handleChange = (): void => {
    if (isMounted) {
      setMatches(getMatches(query));
    }
  };

  // Effect hook to subscribe to media query changes
  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    // Cleanup function to remove event listener
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query, isMounted]);

  return matches;
};
