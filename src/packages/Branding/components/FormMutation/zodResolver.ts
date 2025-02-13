import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { nativeEnum, object, string } from 'zod';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['branding']>) => {
  const code = {
    required: getRequiredMessage(t, 'branding:code'),
  };
  const name = {
    required: getRequiredMessage(t, 'branding:name'),
  };
  const status = {
    required: getRequiredMessage(t, 'branding:status'),
  };
  return object({
    code: string({ required_error: code.required }).min(1, code.required),
    name: string({ required_error: name.required }).min(1, name.required),
    status: nativeEnum(RecordStatus, { required_error: status.required }),
  });
};

export const getFormMutationResolver = (t: TFunction<['branding']>) => {
  return zodResolver(getFormMutationSchema(t));
};
