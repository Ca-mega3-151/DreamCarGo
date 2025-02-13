import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { number, object, string } from 'zod';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { isEmail } from '~/utils/regexes/isEmail';
import { isPhone } from '~/utils/regexes/isPhone';

export const getFormMutationProfileSchema = (t: TFunction<['profile']>) => {
  const name = {
    required: getRequiredMessage(t, 'profile:name'),
  };
  const email = {
    required: getRequiredMessage(t, 'profile:email'),
    invalid: getInvalidMessage(t, 'profile:email'),
  };
  const phone = {
    required: getRequiredMessage(t, 'profile:phone'),
    invalid: getInvalidMessage(t, 'profile:phone'),
  };

  return object({
    avatar: object({
      _id: string(),
      publicUrl: string(),
      filename: string(),
      size: number(),
    })
      .optional()
      .nullable(),
    name: string({ required_error: name.required }).trim().min(1, name.required),
    email: string({ required_error: email.required }).trim().regex(isEmail, email.invalid).min(1, email.required),
    phone: string({ required_error: phone.required }).trim().regex(isPhone, phone.invalid).min(1, phone.required),
  });
};

export const getFormMutationProfileResolver = (t: TFunction<['profile']>) => {
  return zodResolver(getFormMutationProfileSchema(t));
};
