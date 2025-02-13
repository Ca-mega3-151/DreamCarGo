import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export interface UseDelete<Model extends AnyRecord> {
  delete: (records: Model[]) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDelete = <Model extends AnyRecord>({ delete: delete_, onError, onSuccess }: UseDelete<Model>) => {
  const { t } = useTranslation(['common']);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Model[] | false>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!isOpenModalDelete) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await delete_(isOpenModalDelete as Model[]);
      setIsOpenModalDelete(false);
      notification.success({ message: t('common:delete_success') });
      onSuccess?.();
      return response;
    } catch (error) {
      notification.error({
        message: t('common:delete_error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
      onError?.(error);
      return null;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenModalDelete = (records: Model[]) => {
    setIsOpenModalDelete(records);
  };
  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  return {
    isDeleting,
    isOpenModalDelete,
    handleDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  };
};
