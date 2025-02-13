import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface ValidateServiceResponse {
  items: Array<AnyRecord & { _id: string }>;
  hasError: boolean;
  errors: Array<{
    itemIndex: number;
    messages: string[];
  }>;
}
