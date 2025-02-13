import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from '~/shared/ReactJS';

interface Props {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
}

export const NotFound: FC<Props> = ({ buttonText, description, onClick, title }) => {
  const { t } = useTranslation(['components', 'common']);

  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={title ?? t('components:NotFound.not_found_title')}
      subTitle={description ?? t('components:NotFound.not_found_description')}
      extra={
        <Button
          onClick={event => {
            event.stopPropagation();
            if (onClick) {
              onClick?.();
            } else {
              navigate(-1);
            }
          }}
          color="primary"
        >
          {buttonText ?? t('components:NotFound.back_to_list')}
        </Button>
      }
    />
  );
};
