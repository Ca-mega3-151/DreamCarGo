import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { boolean, object, string, TypeOf } from 'zod';
import { FormMutationStateValues } from '~/shared/TypescriptUtilities';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { isEmail } from '~/utils/regexes/isEmail';

export const getFormLoginSchema = (t: TFunction<['auth']>) => {
  const email = {
    required: getRequiredMessage(t, 'auth:email'),
    invalid: getInvalidMessage(t, 'auth:email'),
  };
  const password = {
    required: getRequiredMessage(t, 'password'),
  };
  return object({
    email: string({ required_error: email.required })
      .trim()
      .min(1, { message: email.required })
      .regex(isEmail, { message: email.invalid }),
    password: string({ required_error: password.required }).trim().min(1, { message: password.required }),
    remember: boolean().optional().nullable(),
  });
};

export const getFormLoginResolver = (t: TFunction<['auth']>) => {
  return zodResolver(getFormLoginSchema(t));
};

export type FormLoginValues = TypeOf<ReturnType<typeof getFormLoginSchema>>;
export type FormLoginStateValues = FormMutationStateValues<FormLoginValues>;
