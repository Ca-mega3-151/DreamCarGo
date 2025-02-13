import { SessionStorage } from '@remix-run/node';
import { Cookie } from '@remix-run/server-runtime';
import { SearchParamKey } from '../../../../constants/SearchParamKey';
import { SessionKey } from '../../../../constants/SessionKey';
import { getClientLocales } from './getClientLocales';
import { pick } from './parseAcceptLanguage/parser';

export interface LanguageDetectorOption {
  /**
   * Define the list of supported languages, this is used to determine if one of
   * the languages requested by the user is supported by the application.
   * This should be be same as the supportedLngs in the i18next options.
   */
  supportedLanguages: string[];
  /**
   * Define the fallback language that it's going to be used in the case user
   * expected language is not supported.
   * This should be be same as the fallbackLng in the i18next options.
   */
  fallbackLanguage: string;
  /**
   * If you want to use a cookie to store the user preferred language, you can
   * pass the Cookie object here.
   */
  cookie?: Cookie;
  /**
   * If you want to use a session to store the user preferred language, you can
   * pass the SessionStorage object here.
   * When this is not defined, getting the locale will ignore the session.
   */
  sessionStorage?: SessionStorage;
  /**
   * If defined a sessionStorage and want to change the default key used to
   * store the user preferred language, you can pass the key here.
   * @default "lang"
   * @deprecated This property has been deprecated and will be removed in future versions. The default key used to store the user preferred language is now static and set to "lang".
   */
  sessionKey?: 'lang';
  /**
   * If you want to use search parameters for language detection and want to
   * change the default key used to for the parameter name,
   * you can pass the key here.
   * @default "lang"
   * @deprecated This property has been deprecated and will be removed in future versions. The default key used to store the user preferred language is now static and set to "lang".
   */
  searchParamKey?: 'lang';
  /**
   * The order the library will use to detect the user preferred language.
   * By default the order is
   * - searchParams
   * - cookie
   * - session
   * - header
   * And finally the fallback language.
   */
  order?: Array<'searchParams' | 'cookie' | 'session' | 'header'>;
}

/**
 * The LanguageDetector contains the logic to detect the user preferred language
 * fully server-side by using a SessionStorage, Cookie, URLSearchParams, or Headers.
 */
export class LanguageDetector {
  private _options: LanguageDetectorOption;

  constructor(options: LanguageDetectorOption) {
    this._options = options;
    this._isSessionOnly(options);
    this._isCookieOnly(options);
  }

  /**
   * Checks if language detection is set to session only and throws an error if sessionStorage is not defined.
   * @param options The language detection options.
   */
  private _isSessionOnly = (options: LanguageDetectorOption): void => {
    if (options.order?.length === 1 && options.order[0] === 'session' && !options.sessionStorage) {
      throw new Error('You need a sessionStorage if you want to only get the locale from the session');
    }
  };

  /**
   * Checks if language detection is set to cookie only and throws an error if cookie is not defined.
   * @param options The language detection options.
   */
  private _isCookieOnly = (options: LanguageDetectorOption): void => {
    if (options.order?.length === 1 && options.order[0] === 'cookie' && !options.cookie) {
      throw new Error('You need a cookie if you want to only get the locale from the cookie');
    }
  };

  /**
   * Retrieves the language from the URL search parameters.
   * @param request The request object.
   * @returns The detected language or null if not found.
   */
  private _fromSearchParams = (request: Request): string | null => {
    const url = new URL(request.url);
    if (!url.searchParams.has(SearchParamKey)) {
      return null;
    }
    return this._fromSupported(url.searchParams.get(SearchParamKey));
  };

  /**
   * Retrieves the language from the cookie.
   * @param request The request object.
   * @returns A Promise that resolves to the detected language or null if not found.
   */
  private _fromCookie = async (request: Request): Promise<string | null> => {
    if (!this._options.cookie) {
      return null;
    }

    const cookie = this._options.cookie;
    const lang = await cookie.parse(request.headers.get('Cookie'));
    if (typeof lang !== 'string' || !lang) {
      return null;
    }

    return this._fromSupported(lang);
  };

  /**
   * Retrieves the language from the session storage.
   * @param request The request object.
   * @returns A Promise that resolves to the detected language or null if not found.
   */
  private _fromSessionStorage = async (request: Request): Promise<string | null> => {
    if (!this._options.sessionStorage) {
      return null;
    }

    const session = await this._options.sessionStorage.getSession(request.headers.get('Cookie'));

    const lang = session.get(SessionKey);

    if (!lang) {
      return null;
    }

    return this._fromSupported(lang);
  };

  /**
   * Retrieves the language from the request headers.
   * @param request The request object.
   * @returns The detected language or null if not found.
   */
  private _fromHeader = (request: Request): string | null => {
    const locales = getClientLocales(request);
    if (!locales) {
      return null;
    }
    if (Array.isArray(locales)) {
      return this._fromSupported(locales.join(','));
    }
    return this._fromSupported(locales);
  };

  /**
   * Picks the supported language from the detected language.
   * @param language The detected language.
   * @returns The supported language or the fallback language if none found.
   */
  private _fromSupported = (language: string | null): string | null => {
    return (
      pick(this._options.supportedLanguages, language ?? this._options.fallbackLanguage, { loose: false }) ||
      pick(this._options.supportedLanguages, language ?? this._options.fallbackLanguage, { loose: true })
    );
  };

  /**
   * Detects the user's preferred language based on the specified order of methods.
   * The detection order is determined by the 'order' option in the LanguageDetectorOption.
   * If no language is detected, the fallback language defined in the options is used.
   * @param request The request object.
   * @returns A Promise that resolves to the detected language.
   */
  public detect = async (request: Request): Promise<string> => {
    const order = this._options.order ?? ['searchParams', 'cookie', 'session', 'header'];

    for (const method of order) {
      let locale: string | null = null;

      if (method === 'searchParams') {
        locale = this._fromSearchParams(request);
      }

      if (method === 'cookie') {
        locale = await this._fromCookie(request);
      }

      if (method === 'session') {
        locale = await this._fromSessionStorage(request);
      }

      if (method === 'header') {
        locale = this._fromHeader(request);
      }

      if (locale) {
        return locale;
      }
    }

    return this._options.fallbackLanguage;
  };
}
