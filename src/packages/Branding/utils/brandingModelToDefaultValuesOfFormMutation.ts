import { BrandingFormMutationProps } from '../components/FormMutation/FormMutation';
import { Branding } from '../models/Branding';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';

interface BrandingModelToDefaultValuesOfFormMutation {
  branding: Branding | undefined | null;
}

export const brandingModelToDefaultValuesOfFormMutation = ({
  branding,
}: BrandingModelToDefaultValuesOfFormMutation): BrandingFormMutationProps['defaultValues'] => {
  if (!branding) {
    return {
      status: RecordStatus.ACTIVE,
      name: undefined,
      code: undefined,
    };
  }

  return {
    status: branding.status,
    code: branding.brandingCode,
    name: branding.brandingName,
  };
};
