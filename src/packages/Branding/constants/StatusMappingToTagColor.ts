import { Branding } from '../models/Branding';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';
import { TagProps } from '~/shared/ReactJS';

export const StatusMappingToTagColor: Record<Branding['status'], TagProps['color']> = {
  [RecordStatus.ACTIVE]: 'success',
  [RecordStatus.INACTIVE]: 'error',
};
