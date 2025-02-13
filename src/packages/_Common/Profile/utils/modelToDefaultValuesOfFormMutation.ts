import { ProfileFormMutationProps } from '../components/FormMutation/FormMutation';
import { Profile } from '../models/Profile';

interface ProfileModelToDefaultValuesOfFormMutation {
  profile: Profile | undefined;
}

export const profileModelToDefaultValuesOfFormMutation = ({
  profile,
}: ProfileModelToDefaultValuesOfFormMutation): ProfileFormMutationProps['defaultValues'] => {
  if (!profile) {
    return {
      name: undefined,
      email: undefined,
      phone: undefined,
      avatar: null,
    };
  }

  const avatarInfo = profile.avatarInfo;
  return {
    name: profile.memberName,
    email: profile.email,
    phone: profile.phone,
    avatar: !avatarInfo
      ? null
      : {
          _id: avatarInfo?._id,
          filename: avatarInfo?.filename,
          publicUrl: avatarInfo?.publicUrl,
          size: avatarInfo?.size,
        },
  };
};
