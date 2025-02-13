import { FileResource } from '../../FileResource/models/FileResource';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';

export interface Profile {
  _id: string;
  memberCode: string;
  email: string;
  memberName: string;
  phone: string;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
  avatarInfo?: FileResource;
}
