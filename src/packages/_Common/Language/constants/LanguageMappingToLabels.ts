import { TFunction } from 'i18next';
import { Language } from '../models/Language';

export const getLanguageMappingToLabels = (t: TFunction<['language']>): Record<Language, string> => {
  return {
    [Language.EN]: t('language:EN'),
    [Language.VI]: t('language:VI'),
  };
};
