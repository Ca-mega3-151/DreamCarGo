import { BrandingFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateBranding } from '../services/createBranding';

export const brandingFormMutationValuesToCreateBrandingService = (
  values: BrandingFormMutationValues,
): CreateBranding['data'] => {
  return {
    brandingCode: values.code,
    brandingName: values.name,
    status: values.status,
  };
};
