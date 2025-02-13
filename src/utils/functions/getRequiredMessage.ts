import { ParseKeys, TFunction } from 'i18next';

export const getRequiredMessage = <NameSpace extends any[]>(t: TFunction<NameSpace>, key: ParseKeys<NameSpace>) => {
  return t('common:type_required', { type: t(key) }).toString();
};
