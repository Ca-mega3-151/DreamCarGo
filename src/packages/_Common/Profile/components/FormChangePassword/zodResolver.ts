import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { zodAlwaysRefine } from '~/utils/functions/zodAlwaysRefine';

export const getFormChangePasswordSchema = (t: TFunction<['profile']>) => {
  const oldPassword = {
    required: getRequiredMessage(t, 'profile:old_password'),
  };

  const newPassword = {
    required: getRequiredMessage(t, 'profile:new_password'),
    invalid: t('profile:password_invalid'),
  };
  const confirmPassword = {
    required: getRequiredMessage(t, 'profile:confirm_password'),
  };

  return zodAlwaysRefine(
    object({
      oldPassword: string({ required_error: oldPassword.required }).min(1, oldPassword.required),
      newPassword: string({ required_error: newPassword.required }).min(1, newPassword.required),
      confirmPassword: string({ required_error: confirmPassword.required }).min(1, confirmPassword.required),
    }),
  ).refine(
    data => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: t('profile:confirm_password_not_match'),
      path: ['confirmPassword'],
    },
  );
};

export const getFormChangePasswordResolver = (t: TFunction<['profile']>) => {
  return zodResolver(getFormChangePasswordSchema(t));
};
