import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { Branding } from '../../models/Branding';
import { createBranding } from '../../services/createBranding';
import { getBrandings } from '../../services/getBrandings';
import { brandingFormMutationValuesToCreateBrandingService } from '../../utils/brandingFormMutationValuesToCreateBrandingService';
import { brandingModelToDefaultValuesOfFormMutation } from '../../utils/brandingModelToDefaultValuesOfFormMutation';
import { BrandingFormMutation, BrandingFormMutationValues } from '../FormMutation/FormMutation';
import { SelectMultipleDecouplingWithCreatable } from '~/components/SelectDecouplingWithCreatable';
import { notification, SelectMultipleDecouplingProps } from '~/shared/ReactJS';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

interface Props
  extends Pick<
    SelectMultipleDecouplingProps<Branding, Branding['brandingCode']>,
    'disabled' | 'allowClear' | 'placeholder' | 'onChange'
  > {
  brandings?: Array<Branding['brandingCode']>;
}

const transformToOption = (branding: Branding) => {
  const label = [branding.brandingName, branding.brandingCode].join(' - ');
  return {
    label,
    searchValue: label,
    value: branding.brandingCode,
    rawData: branding,
  };
};

export const SelectBrandings = ({ brandings = [], onChange, ...props }: Props) => {
  const { t } = useTranslation(['branding']);

  const FormCreate = useMemo(() => {
    return 'SelectBrandings__FormCreate' + v4();
  }, []);
  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding: undefined });
  }, []);

  return (
    <>
      <SelectMultipleDecouplingWithCreatable<Branding, Branding['brandingCode'], BrandingFormMutationValues>
        {...props}
        searchType="client"
        value={brandings}
        onChange={onChange}
        formUid={FormCreate}
        transformToOption={transformToOption}
        service={async () => {
          try {
            const response = await getBrandings({
              searcher: {},
              sorter: {},
              page: 1,
              pageSize: 99999,
            });
            return response.data.hits;
          } catch (error) {
            notification.error({ message: handleCatchClauseAsMessage({ error, t }) });
            return [];
          }
        }}
        createModel={async data => {
          const response = await createBranding({
            data: brandingFormMutationValuesToCreateBrandingService(data),
          });
          return response.data;
        }}
        Form={({ formUid, isSubmitting, onSubmit }) => {
          return (
            <BrandingFormMutation
              uid={formUid}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          );
        }}
      />
    </>
  );
};
