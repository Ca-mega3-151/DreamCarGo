import { Branding } from '~/packages/Branding/models/Branding';
import { brandingDeleteUrlSearchParamsUtils } from '~/packages/Branding/utils/deleteUrlSearchParams';

export const ListingBrandingWithReactRouterAndModalBaseUrl = '/branding-with-react-router-and-modal';

export const ApiCreateBrandingWithReactRouterAndModalBaseUrl =
  ListingBrandingWithReactRouterAndModalBaseUrl + '/api/create';

export const ApiEditBrandingWithReactRouterAndModalBaseUrl =
  ListingBrandingWithReactRouterAndModalBaseUrl + '/api/:brandingCode/edit';
export const ApiEditBrandingWithReactRouterAndModalFullUrl = ({ brandingCode }: Pick<Branding, 'brandingCode'>) => {
  return ApiEditBrandingWithReactRouterAndModalBaseUrl.replace(':brandingCode', brandingCode);
};

export const ApiDeleteBrandingsWithModalBaseUrl = ListingBrandingWithReactRouterAndModalBaseUrl + '/api/delete';
export const ApiDeleteBrandingsWithModalFullUrl = (brandingCodes: Array<Branding['brandingCode']>) => {
  const searchParams = brandingDeleteUrlSearchParamsUtils.encrypt({ brandingCodes });
  return ApiDeleteBrandingsWithModalBaseUrl + searchParams;
};
