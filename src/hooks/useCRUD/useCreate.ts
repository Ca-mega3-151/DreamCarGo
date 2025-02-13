import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export interface UseCreate<FormValues extends AnyRecord, Model extends AnyRecord> {
  create: (formValues: FormValues) => Promise<Model>;
  onSuccess?: (response: Model) => void;
  onError?: (error: any) => void;
}

export const useCreate = <FormValues extends AnyRecord, Model extends AnyRecord>({
  create,
  onError,
  onSuccess,
}: UseCreate<FormValues, Model>) => {
  const { t } = useTranslation(['common']);

  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (formValues: FormValues) => {
    setIsCreating(true);
    try {
      const response = await create(formValues);
      setIsOpenModalCreate(false);
      notification.success({ message: t('common:create_success') });
      onSuccess?.(response);
      return response;
    } catch (error) {
      notification.error({
        message: t('common:create_error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
      onError?.(error);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenModalCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setIsOpenModalCreate(false);
  };

  return {
    isCreating,
    isOpenModalCreate,
    handleCreate,
    handleOpenModalCreate,
    handleCloseModalCreate,
  };
};
