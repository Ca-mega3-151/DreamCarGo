import i18n, { Namespace, TFunction } from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { i18nConfig } from './config';
import { SearchParamKey } from '~/overrides/RemixJS/server';

i18n
  .use(Languagedetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ...i18nConfig,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      lookupQuerystring: SearchParamKey,
    },
  });

export const i18nServer = {
  getFixedT: <NS extends Namespace>(_request: Request, _namespaces: NS) => {
    return Promise.resolve(i18n.t as TFunction<NS>);
  },
};
