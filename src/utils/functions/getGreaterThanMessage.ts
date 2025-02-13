import { ParseKeys, TFunction } from 'i18next';

export const getGreaterThanMessage = <NameSpace extends any[]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
  min: number,
) => {
  return t('common:type_greater_than', { type: t(key), number: min }).toString();
};
