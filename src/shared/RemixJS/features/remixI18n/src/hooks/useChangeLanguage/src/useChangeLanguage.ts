import { useSearchParams } from '@remix-run/react';
import { i18n } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchParamKey } from '../../../constants/SearchParamKey';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';

/**
 * Detect when the locale returned by the root route loader changes and call i18n.changeLanguage` with the new locale.
 * This will ensure translations are loaded automatically.
 * @param locale The locale returned by the root route loader.
 */
export const useChangeLanguage = (locale?: string): { i18n: i18n; changeLanguage: (locale: string) => void } => {
  const { i18n, ready } = useTranslation();
  const [currentUrlSearchParams, setCurrentSearchParams] = useSearchParams();

  const handleChangeLanguage = (locale: string): void => {
    setCurrentSearchParams(current => {
      current.set(SearchParamKey, locale);
      return current;
    });
  };

  useEffect(() => {
    const isI18nParams = currentUrlSearchParams.get(SearchParamKey);
    if (isI18nParams) {
      currentUrlSearchParams.delete(SearchParamKey);
      updateURLSearchParamsOfBrowserWithoutNavigation(currentUrlSearchParams);
    }
  }, [currentUrlSearchParams]);

  useEffect(() => {
    if (ready && locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n, ready]);

  return {
    i18n,
    changeLanguage: handleChangeLanguage,
  };
};
