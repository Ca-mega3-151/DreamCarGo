import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TableActions, TableActionsProps } from '~/shared/ReactJS';

interface Props {
  onDelete?: () => void;
  onEdit?: () => void;
  isLoading?: boolean;
  className?: string;
  fitted?: boolean;
  Other?: ReactNode;
  moreActions?: TableActionsProps['items'];
  deletable: boolean;
  editable: boolean;
}

export const DetailFooter = ({
  onDelete,
  onEdit,
  isLoading,
  className,
  fitted,
  Other,
  moreActions = [],
  deletable,
  editable,
}: Props) => {
  const { t } = useTranslation(['components']);

  const cancelText_ = t('components:Detail.delete').toString();
  const okText_ = t('components:Detail.edit').toString();

  const renderDeleteButton = () => {
    if (!deletable) {
      return null;
    }
    return (
      <Button color="error" ghost disabled={isLoading} onClick={onDelete}>
        {cancelText_}
      </Button>
    );
  };
  const renderEditButton = () => {
    if (!editable) {
      return null;
    }
    return (
      <Button color="primary" loading={isLoading} disabled={isLoading} onClick={onEdit}>
        {okText_}
      </Button>
    );
  };

  if (!deletable && !editable && !Other) {
    return null;
  }

  return (
    <div
      className={classNames(
        'border-t-solid sticky bottom-0 z-10 flex flex-col items-end justify-end gap-2 border-t border-t-neutral-200 bg-white py-4 px-4 md:px-8 sm:flex-row sm:items-center rounded-bl-[inherit] rounded-br-[inherit] !-mx-yy-padding-xs md:!-mx-yy-padding',
        className,
      )}
    >
      <div className={classNames('flex items-center justify-end gap-3', fitted ? 'w-full' : '')}>
        {renderDeleteButton()}
        {Other}
        {renderEditButton()}
        {!isEmpty(moreActions) && <TableActions items={moreActions} />}
      </div>
    </div>
  );
};
