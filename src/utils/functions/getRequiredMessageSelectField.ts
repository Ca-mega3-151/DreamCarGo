import { ParseKeys, TFunction } from 'i18next';

export const getRequiredMessageSelectField = <NameSpace extends any[]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
) => {
  return t('common:type_must_be_select', { type: t(key) }).toString();
};
