import { useTranslation } from 'react-i18next';
import { Modal as AntModal, ModalProps as AntModalProps } from '~/shared/ReactJS';

export interface ModalWithI18nProps extends AntModalProps {}

export const ModalWithI18n = ({ maskClosable = false, ...props }: ModalWithI18nProps) => {
  const { t } = useTranslation(['components']);

  const okText = props.okText ?? t('components:Modal.ok');
  const cancelText = props.cancelText ?? t('components:Modal.cancel');

  return <AntModal {...props} maskClosable={maskClosable} okText={okText} cancelText={cancelText} />;
};
