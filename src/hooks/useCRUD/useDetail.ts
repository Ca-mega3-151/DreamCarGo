import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export interface UseDetail<Model extends AnyRecord, ShortModel extends AnyRecord = Model> {
  record?: Model;
  getDetail?: (record: ShortModel) => Promise<Model>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDetail = <Model extends AnyRecord, ShortModel extends AnyRecord = Model>({
  record,
  getDetail,
  onError,
  onSuccess,
}: UseDetail<Model, ShortModel>) => {
  const { t } = useTranslation(['common']);

  const [isOpenModalDetail, setIsOpenModalDetail] = useState<ShortModel | false>(false);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [recordState, setRecordState] = useState<Model | null>(record ?? null);

  const handleGetDetail = async () => {
    if (!isOpenModalDetail || !getDetail) {
      return;
    }
    setIsFetchingDetail(true);
    setRecordState(null);
    try {
      const response = await getDetail(isOpenModalDetail);
      setRecordState(response);
      onSuccess?.();
      return response;
    } catch (error) {
      notification.error({
        message: t('common:error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
      onError?.(error);
      return null;
    } finally {
      setIsFetchingDetail(false);
    }
  };

  const handleOpenModalDetail = (record: ShortModel) => {
    setIsOpenModalDetail(record);
  };
  const handleCloseModalDetail = () => {
    setIsOpenModalDetail(false);
  };

  useEffect(() => {
    if (record) {
      return;
    }
    handleGetDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModalDetail]);

  return {
    isFetchingDetail,
    isOpenModalDetail,
    recordState,
    setRecordState,
    handleGetDetail,
    handleOpenModalDetail,
    handleCloseModalDetail,
  };
};
