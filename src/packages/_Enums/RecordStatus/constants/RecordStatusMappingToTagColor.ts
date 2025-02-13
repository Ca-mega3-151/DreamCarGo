import { RecordStatus } from '../models/RecordStatus';
import { TagProps } from '~/shared/ReactJS';

export const RecordStatusMappingToTagColor: Record<RecordStatus, TagProps['color']> = {
  [RecordStatus.ACTIVE]: 'success',
  [RecordStatus.INACTIVE]: 'error',
};
