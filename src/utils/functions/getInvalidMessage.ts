import { ParseKeys, TFunction } from 'i18next';

export const getInvalidMessage = <NameSpace extends any[]>(t: TFunction<NameSpace>, key: ParseKeys<NameSpace>) => {
  return t('common:type_invalid', { type: t(key) }).toString();
};
