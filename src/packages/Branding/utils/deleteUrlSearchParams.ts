import { array, object, string } from 'zod';
import { GetTypeOfSearchParamsFromUrlSearchParamsUtils, UrlSearchParamsUtils } from '~/shared/Utilities';

export const brandingDeleteUrlSearchParamsSchema = object({
  brandingCodes: array(string()).optional(),
});

export const brandingDeleteUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: brandingDeleteUrlSearchParamsSchema,
});

export type BrandingDeleteSearchParams = GetTypeOfSearchParamsFromUrlSearchParamsUtils<
  typeof brandingDeleteUrlSearchParamsUtils
>;
