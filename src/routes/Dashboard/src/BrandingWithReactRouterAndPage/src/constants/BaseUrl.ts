import { Branding } from '~/packages/Branding/models/Branding';
import { brandingDeleteUrlSearchParamsUtils } from '~/packages/Branding/utils/deleteUrlSearchParams';
import {
  BrandingListingSearchParams,
  brandingListingUrlSearchParamsUtils,
} from '~/packages/Branding/utils/listingUrlSearchParams';

export const ListingBrandingWithReactRouterAndPageBaseUrl = '/branding-with-react-router-and-page';

export const CreateBrandingWithReactRouterAndPageBaseUrl = ListingBrandingWithReactRouterAndPageBaseUrl + '/create';

export const EditBrandingWithReactRouterAndPageBaseUrl =
  ListingBrandingWithReactRouterAndPageBaseUrl + '/:brandingCode/edit';
export const EditBrandingWithReactRouterAndPageFullUrl = ({ brandingCode }: Pick<Branding, 'brandingCode'>) => {
  return EditBrandingWithReactRouterAndPageBaseUrl.replace(':brandingCode', brandingCode);
};

export const ApiDeleteBrandingsWithPageBaseUrl = ListingBrandingWithReactRouterAndPageBaseUrl + '/api/delete';
export const ApiDeleteBrandingsWithPageFullUrl = (brandingCodes: Array<Branding['brandingCode']>) => {
  const searchParams = brandingDeleteUrlSearchParamsUtils.encrypt({ brandingCodes });
  return ApiDeleteBrandingsWithPageBaseUrl + searchParams;
};

export const ApiExportBrandingsWithPageBaseUrl = ListingBrandingWithReactRouterAndPageBaseUrl + '/api/export';
export const ApiExportBrandingsWithPageFullUrl = (listingSearchParams: BrandingListingSearchParams) => {
  const searchParams = brandingListingUrlSearchParamsUtils.encrypt(listingSearchParams);
  return ApiExportBrandingsWithPageBaseUrl + searchParams;
};
