import { nativeEnum, number, object, string } from 'zod';
import { RecordsPerPage } from '../../../services/constants/RecordsPerPage';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';
import { SorterOperator } from '~/services/constants/SorterOperator';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';
import { GetTypeOfSearchParamsFromUrlSearchParamsUtils, UrlSearchParamsUtils } from '~/shared/Utilities';

export const brandingListingUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  pageSize: number().optional().default(RecordsPerPage),
  filter: object({
    other: string().optional(),
    brandingCode: string().optional(),
    status: nativeEnum(RecordStatus).optional(),
  }).optional(),
  sorter: object({
    brandingCode: nativeEnum(SorterOperator).optional(),
  }).optional(),
});

export const brandingListingUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: brandingListingUrlSearchParamsSchema,
});

export type BrandingListingSearchParams = GetTypeOfSearchParamsFromUrlSearchParamsUtils<
  typeof brandingListingUrlSearchParamsUtils
>;

export interface BrandingListingSortValues
  extends FormQueryStateValues<BrandingListingSearchParams['sorter'], 'brandingCode'> {}

export interface BrandingListingFilterValues
  extends FormQueryStateValues<BrandingListingSearchParams['filter'], 'brandingCode' | 'status'> {}
