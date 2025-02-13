import { TFunction } from 'i18next';
import { RecordStatus } from '../models/RecordStatus';

export const getRecordStatusMappingToLabels = (t: TFunction<['record_status']>): Record<RecordStatus, string> => {
  return {
    ACTIVE: t('record_status:ACTIVE'),
    INACTIVE: t('record_status:INACTIVE'),
  };
};
