import { i18n } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchParamKey } from '../../../constants/SearchParamKey';
import { useSearchParams } from '~/overrides/@remix-run/react';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';

/**
 * Detect when the locale returned by the root route loader changes and call i18n.changeLanguage` with the new locale.
 * This will ensure translations are loaded automatically.
 * @param locale The locale returned by the root route loader.
 */
export const useChangeLanguage = (locale?: string): { i18n: i18n; changeLanguage: (locale: string) => void } => {
  const { i18n } = useTranslation();
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
      i18n.changeLanguage(isI18nParams);
      currentUrlSearchParams.delete(SearchParamKey);
      updateURLSearchParamsOfBrowserWithoutNavigation(currentUrlSearchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrlSearchParams]);

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return {
    i18n,
    changeLanguage: handleChangeLanguage,
  };
};
