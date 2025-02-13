import { ProfileFormMutationValues } from '../components/FormMutation/FormMutation';
import { UpdateProfile } from '../services/updateProfile';

export const profileFormMutationValuesToCreateService = (values: ProfileFormMutationValues): UpdateProfile['data'] => {
  return {
    avatar: values.avatar?._id,
    userName: values.name,
    email: values.email,
    phone: values.phone,
  };
};
