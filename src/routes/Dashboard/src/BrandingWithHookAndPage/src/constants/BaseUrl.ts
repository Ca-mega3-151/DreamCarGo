import { Branding } from '~/packages/Branding/models/Branding';

export const ListingBrandingWithHookAndPageBaseUrl = '/branding-with-hook-and-page';

export const CreateBrandingWithHookAndPageBaseUrl = ListingBrandingWithHookAndPageBaseUrl + '/create';

export const EditBrandingWithHookAndPageBaseUrl = ListingBrandingWithHookAndPageBaseUrl + '/:brandingCode/edit';
export const EditBrandingWithHookAndPageFullUrl = ({ brandingCode }: Pick<Branding, 'brandingCode'>) => {
  return EditBrandingWithHookAndPageBaseUrl.replace(':brandingCode', brandingCode);
};
