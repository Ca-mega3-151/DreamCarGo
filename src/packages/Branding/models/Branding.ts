import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';

export interface Branding {
  _id: string;
  merchantCode: string;
  brandingCode: string;
  brandingName: string;
  createdBy: string;
  updatedBy: string;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
