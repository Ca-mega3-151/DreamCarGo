import { useMatches } from '@remix-run/react';
import { nth } from 'ramda';

/**
 * Get the locale returned by the root route loader under the `locale` key.
 * @param localeKey The key under which the locale is stored in the data returned by the root route loader.
 *                  Default value is 'locale'.
 * @returns The locale string obtained from the root route loader.
 *
 * @example
 * let locale = useLocale()
 * let formattedDate = date.toLocaleDateString(locale);
 * @example
 * let locale = useLocale("language")
 * let formattedDate = date.toLocaleDateString(locale);
 */
export const useLocale = (localeKey = 'locale'): string => {
  const matches = useMatches();
  const rootMatch = nth(0, matches);
  const { [localeKey]: locale } = rootMatch ? (rootMatch.data as Record<string, string>) : {};
  if (!locale) {
    throw new Error('Missing locale returned by the root loader.');
  }
  if (typeof locale === 'string') {
    return locale;
  }
  throw new Error('Invalid locale returned by the root loader.');
};
