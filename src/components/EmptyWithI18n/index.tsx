import { useTranslation } from 'react-i18next';
import { Empty } from '~/shared/ReactJS';

export const EmptyWithI18n = () => {
  const { t } = useTranslation(['components']);
  return (
    <div>
      <Empty />
      <div className="mt-1 font-medium text-neutral-500">{t('components:Empty.no_data')}</div>
    </div>
  );
};
