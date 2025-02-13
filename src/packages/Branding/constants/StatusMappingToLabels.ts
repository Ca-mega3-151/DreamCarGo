import { TFunction } from 'i18next';
import { Branding } from '../models/Branding';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';

export const getStatusMappingToLabels = (t: TFunction<['branding']>): Record<Branding['status'], string> => {
  return {
    [RecordStatus.ACTIVE]: t('branding:active'),
    [RecordStatus.INACTIVE]: t('branding:deactive'),
  };
};
