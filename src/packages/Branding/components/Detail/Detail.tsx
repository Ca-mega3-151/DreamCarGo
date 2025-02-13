import { useMemo } from 'react';
import { Branding } from '../../models/Branding';
import { brandingModelToDefaultValuesOfFormMutation } from '../../utils/brandingModelToDefaultValuesOfFormMutation';
import { BrandingFormMutation } from '../FormMutation/FormMutation';

interface Props {
  branding: Branding;
}

export const BrandingDetail = ({ branding }: Props) => {
  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding });
  }, [branding]);

  return <BrandingFormMutation isSubmitting={false} uid="" disabled defaultValues={defaultValues} />;
};
