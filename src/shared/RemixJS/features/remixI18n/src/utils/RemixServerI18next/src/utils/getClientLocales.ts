import { getHeaders } from './getHeaders';
import { formatLanguageString } from './parseAcceptLanguage/formatLanguageString';
import { parse, pick } from './parseAcceptLanguage/parser';

export type Locales = string | string[] | undefined;

/**
 * Get the client's locales from the Accept-Language header.
 * If the header is not defined returns null.
 * If the header is defined return an array of locales, sorted by the quality
 * value.
 *
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let locales = getClientLocales(request)
 *   let date = new Date().toLocaleDateString(locales, {
 *     "day": "numeric",
 *   });
 *   return json({ date })
 * }
 */
export const getClientLocales = (requestOrHeaders: Request | Headers): Locales => {
  const headers = getHeaders(requestOrHeaders);

  const acceptLanguage = headers.get('Accept-Language');

  // if the header is not defined, return undefined
  if (!acceptLanguage) {
    return undefined;
  }

  const locale = pick(
    Intl.DateTimeFormat.supportedLocalesOf(
      parse(acceptLanguage)
        .filter(lang => {
          return lang.code !== '*';
        })
        .map(formatLanguageString),
    ),
    acceptLanguage,
  );

  return locale ?? undefined;
};
