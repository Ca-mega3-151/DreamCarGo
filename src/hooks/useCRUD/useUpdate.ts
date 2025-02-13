import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDetail, UseDetail } from './useDetail';
import { notification } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export interface UseUpdate<FormValues extends AnyRecord, Model extends AnyRecord, ShortModel extends AnyRecord>
  extends Omit<UseDetail<Model, ShortModel>, 'onSuccess' | 'onError'> {
  update: (params: { formValues: FormValues; record: Model }) => Promise<Model>;
  onSuccess?: (response: Model) => void;
  onError?: (error: any) => void;
}

export const useUpdate = <FormValues extends AnyRecord, Model extends AnyRecord, ShortModel extends AnyRecord>({
  update,
  onError,
  onSuccess,
  getDetail,
  record,
}: UseUpdate<FormValues, Model, ShortModel>) => {
  const { t } = useTranslation(['common']);

  const {
    handleCloseModalDetail,
    handleOpenModalDetail,
    isFetchingDetail,
    isOpenModalDetail,
    recordState,
    setRecordState,
  } = useDetail<Model, ShortModel>({ getDetail, record });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (formValues: FormValues) => {
    if (!recordState) {
      return null;
    }
    setIsUpdating(true);
    try {
      const response = await update({
        formValues,
        record: recordState,
      });
      if (record) {
        setRecordState?.(response);
      }
      handleCloseModalDetail();
      notification.success({ message: t('common:save_success') });
      onSuccess?.(response);
      return response;
    } catch (error) {
      notification.error({
        message: t('common:save_error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
      onError?.(error);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    isFetchingDetail,
    isOpenModalUpdate: isOpenModalDetail,
    recordState,
    handleUpdate,
    handleOpenModalUpdate: handleOpenModalDetail,
    handleCloseModalUpdate: handleCloseModalDetail,
  };
};
