import { forwardRef, useMemo } from 'react';
import { Branding } from '../../models/Branding';
import { brandingModelToDefaultValuesOfFormMutation } from '../../utils/brandingModelToDefaultValuesOfFormMutation';
import {
  BrandingFormMutation,
  BrandingFormMutationActions,
  BrandingFormMutationValues,
} from '../FormMutation/FormMutation';
import { NotFound } from '~/components/NotFound';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';

interface Props {
  branding: Branding | undefined | null;
  uid: string;
  isSubmitting: boolean;
  fieldsError?: FieldsErrorOfForm<BrandingFormMutationValues>;
  onSubmit?: (values: BrandingFormMutationValues) => void;
  disabled?: boolean;
}

export const BrandingEdit = forwardRef<BrandingFormMutationActions, Props>(({ branding, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding });
  }, [branding]);

  if (!branding) {
    return <NotFound />;
  }

  return <BrandingFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
});

BrandingEdit.displayName = 'BrandingEdit';
