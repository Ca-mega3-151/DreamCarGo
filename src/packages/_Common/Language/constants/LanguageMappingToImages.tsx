import { ReactNode } from 'react';
import { Language } from '../models/Language';
import { EN } from '~/components/Icons/flags/EN';
import { VI } from '~/components/Icons/flags/VI';

export const LanguageMappingToImages: Record<Language, ReactNode> = {
  [Language.EN]: <EN className="text-xl" />,
  [Language.VI]: <VI className="text-xl" />,
};
