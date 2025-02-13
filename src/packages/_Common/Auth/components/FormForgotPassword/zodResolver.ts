import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { isEmail } from '~/utils/regexes/isEmail';

export const getFormForgotPasswordSchema = (t: TFunction<['auth']>) => {
  const email = {
    required: getRequiredMessage(t, 'auth:email'),
    invalid: getInvalidMessage(t, 'auth:email'),
  };
  return object({
    email: string({ required_error: email.required })
      .trim()
      .min(1, { message: email.required })
      .regex(isEmail, { message: email.invalid }),
  });
};

export const getFormForgotPasswordResolver = (t: TFunction<['auth']>) => {
  return zodResolver(getFormForgotPasswordSchema(t));
};
