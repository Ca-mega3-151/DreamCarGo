import { EntryContext } from '@remix-run/server-runtime';
import { FlatNamespace, InitOptions, Module, Namespace, NewableModule, TFunction, createInstance, i18n } from 'i18next';
import { LanguageDetector, LanguageDetectorOption } from './utils/LanguageDetector';

// @ts-ignore
const DEFAULT_NS: Namespace = 'translation';

export interface RemixServerI18nextOption {
  /**
   * The i18next options used to initialize the internal i18next instance.
   */
  i18next?: Omit<InitOptions, 'react' | 'detection'> | null;
  /**
   * The i18next plugins used to extend the internal i18next instance
   * when creating a new TFunction.
   */
  plugins?: NewableModule<Module>[] | Module[];
  detection: LanguageDetectorOption;
}

/**
 * Provides functionalities to detect the user's preferred language and create translation functions for server-side rendering.
 */
export class RemixServerI18next {
  private _detector: LanguageDetector;
  private _options: RemixServerI18nextOption;
  constructor(options: RemixServerI18nextOption) {
    this._options = options;
    this._detector = new LanguageDetector(this._options.detection);
  }

  /**
   * Creates a new instance of i18next with the provided options.
   * @param options The options to initialize i18next.
   * @returns A Promise that resolves to the initialized i18next instance.
   */
  private _createInstance = async (options: Omit<InitOptions, 'react'> = {}): Promise<i18n> => {
    const instance = createInstance();
    const plugins = this._options.plugins ?? [];
    for (const plugin of plugins) {
      instance.use(plugin);
    }
    await instance.init(options);
    return instance;
  };

  /**
   * Detect the current locale by following the order defined in the
   * `detection.order` option.
   * By default the order is
   * - searchParams
   * - cookie
   * - session
   * - header
   * And finally the fallback language.
   */
  public getLocale = async (request: Request): Promise<string> => {
    return this._detector.detect(request);
  };

  /**
   * Get the namespaces required by the routes which are going to be rendered
   * when doing SSR.
   *
   * @param context The EntryContext object received by `handleRequest` in entry.server
   *
   * @example
   * await instance.init({
   *   ns: i18n.getRouteNamespaces(context),
   *   // ...more options
   * });
   */
  public getRouteNamespaces = (context: EntryContext): string[] => {
    const namespaces = Object.values(context.routeModules).flatMap(route => {
      if (typeof route?.handle !== 'object') {
        return [];
      }
      if (!route.handle) {
        return [];
      }
      if (!('i18n' in route.handle)) {
        return [];
      }
      if (typeof route.handle.i18n === 'string') {
        return [route.handle.i18n];
      }
      if (
        Array.isArray(route.handle.i18n) &&
        route.handle.i18n.every(value => {
          return typeof value === 'string';
        })
      ) {
        return route.handle.i18n as string[];
      }
      return [];
    });

    return [...new Set(namespaces)];
  };

  /**
   * Return a TFunction that can be used to translate strings server-side.
   * This function is fixed to a specific namespace.
   *
   * @param requestOrLocale The request object or the locale string already detected
   * @param namespaces The namespaces to use for the T function. (Default: `translation`).
   * @param options The i18next init options
   */
  public getFixedT = async <N extends FlatNamespace | readonly [FlatNamespace, ...FlatNamespace[]]>(
    requestOrLocale: Request | string,
    namespaces?: N,
    options: Omit<InitOptions, 'react'> = {},
  ): Promise<TFunction<N>> => {
    let parsedNamespaces = namespaces ?? DEFAULT_NS;
    // Make sure there's at least one namespace
    if (!namespaces || namespaces.length === 0) {
      parsedNamespaces = (this._options.i18next?.defaultNS || 'translation') as N;
    }

    const [instance, locale] = await Promise.all([
      this._createInstance({
        ...this._options.i18next,
        ...options,
        fallbackNS: parsedNamespaces,
        defaultNS: typeof parsedNamespaces === 'string' ? parsedNamespaces : parsedNamespaces[0],
      }),
      typeof requestOrLocale === 'string' ? requestOrLocale : this.getLocale(requestOrLocale),
    ]);

    await instance.changeLanguage(locale);
    await instance.loadNamespaces(parsedNamespaces);

    return instance.getFixedT(locale, parsedNamespaces);
  };
}
