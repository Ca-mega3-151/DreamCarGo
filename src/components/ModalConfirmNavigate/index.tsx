import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalWithI18n, ModalWithI18nProps } from '../ModalWithI18n';

export interface ModalConfirmNavigateProps
  extends Pick<ModalWithI18nProps, 'open' | 'onCancel' | 'onOk' | 'confirmLoading'> {
  title?: ReactNode;
  subTitle?: ReactNode;
  description?: ReactNode;
}

export const ModalConfirmNavigate = ({ title, description, subTitle, ...props }: ModalConfirmNavigateProps) => {
  const { t } = useTranslation(['components']);

  const title_ = title ?? t('components:ModalConfirmNavigate.title');
  const subTitle_ = subTitle ?? t('components:ModalConfirmNavigate.sub_title');
  const description_ = description ?? t('components:ModalConfirmNavigate.description');

  return (
    <ModalWithI18n {...props} title={title_} okText={t('components:ModalConfirmNavigate.ok')}>
      <p className="mb-1 font-semibold text-yy-primary">{subTitle_}</p>
      <p>{description_}</p>
    </ModalWithI18n>
  );
};
