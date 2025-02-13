import { values } from 'ramda';
import { AuthLocales } from '../../Auth/locales/AuthLocales';
import { FileResourceLocales } from '../../FileResource/locales/FileResourceLocales';
import { LanguageLocales } from '../../Language/locales/language';
import { Language } from '../../Language/models/Language';
import { ProfileLocales } from '../../Profile/locales/ProfileLocales';
import { CommonLocales } from './locales/CommonLocales';
import { ComponentsLocales } from './locales/ComponentsLocales';
import { DashboardLayoutLocales } from './locales/DashboardLayoutLocales';
import { DashboardLocales } from './locales/DashboardLocales';
import { ErrorMessageLocales } from './locales/ErrorMessageLocales';
import { Page403Locales } from './locales/Page403Locales';
import { Page404Locales } from './locales/Page404Locales';
import { Page500Locales } from './locales/Page500Locales';
import { RecordsStatusLocales } from '~/packages/_Enums/RecordStatus/locales/RecordsStatusLocales';
import { BrandingLocales } from '~/packages/Branding/locales/BrandingLocales';
import { getPublicEnv } from '~/utils/functions/getPublicEnv';

// This is the language you want to use in case
// if the user language is not in the supportedLngs
const fallbackLng = getPublicEnv('VITE_DEFAULT_LANGUAGE') ?? values(Language)[0];

// The default namespace of i18next is "common", but you can customize it here
const defaultNS = 'common';

const resources = {
  en: {
    // General
    components: ComponentsLocales.en,
    common: CommonLocales.en,
    auth: AuthLocales.en,
    profile: ProfileLocales.en,
    error_message: ErrorMessageLocales.en,
    page403: Page403Locales.en,
    page404: Page404Locales.en,
    page500: Page500Locales.en,
    dashboard_layout: DashboardLayoutLocales.en,
    dashboard: DashboardLocales.en,
    language: LanguageLocales.en,
    file_resource: FileResourceLocales.en,

    // Common packages
    record_status: RecordsStatusLocales.en,

    // Bussiness logic
    branding: BrandingLocales.en,
  },
  vi: {
    // General
    components: ComponentsLocales.vi,
    common: CommonLocales.vi,
    auth: AuthLocales.vi,
    profile: ProfileLocales.vi,
    error_message: ErrorMessageLocales.vi,
    page403: Page403Locales.vi,
    page404: Page404Locales.vi,
    page500: Page500Locales.vi,
    dashboard_layout: DashboardLayoutLocales.vi,
    dashboard: DashboardLocales.vi,
    language: LanguageLocales.vi,
    file_resource: FileResourceLocales.vi,

    // Common packages
    record_status: RecordsStatusLocales.vi,

    // Bussiness logic
    branding: BrandingLocales.vi,
  },
};

export const i18nConfig = {
  supportedLngs: values(Language),
  fallbackLng,
  defaultNS,
  resources,
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
