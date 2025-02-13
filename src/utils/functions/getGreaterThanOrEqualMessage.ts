import { ParseKeys, TFunction } from 'i18next';

export const getGreaterThanOrEqualMessage = <NameSpace extends any[]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
  min: number,
) => {
  return t('common:type_greater_than_or_equal', { type: t(key), number: min }).toString();
};
