import { useFetcher, useSearchParams } from '@remix-run/react';
import { isEmpty } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { SimpleListingResponse } from '../../../types/SimpleListingResponse';
import { notification } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface UseListingData<T extends AnyRecord> {
  /** Data loaded initially, typically from server-side rendering or initial fetch */
  loaderData: SimpleListingResponse<T> | undefined;

  /** Data fetched asynchronously, usually in response to client-side actions */
  fetcherData: {
    data: SimpleListingResponse<T> | undefined;
    state: ReturnType<typeof useFetcher>['state'];
  };

  /** Function to get the nearest available page given a specific page number */
  getNearestPageAvailable: (page: number) => void;
}

/**
 * Custom hook to manage listing data, combining initial loader data and fetcher data,
 * and providing a utility to check if data is being fetched.
 *
 * @template Model - The type of records in the listing
 * @param {UseListingData<Model>} params - The parameters required for the hook
 * @param {SimpleListingResponse<T> | undefined} params.loaderData - Initial loaded data
 * @param {{ data: SimpleListingResponse<T> | undefined, state: string }} params.fetcherData - Data fetched asynchronously
 * @param {Function} params.getNearestPageAvailable - Function to get the nearest available page given a specific page number
 * @returns {Object} The listing data and fetching status
 * @returns {SimpleListingResponse<Model>} returns.data - The serialized data from the response
 * @returns {boolean} returns.isFetchingList - Indicates if the data is currently being fetched
 */
export const useListingData = <Model extends AnyRecord>({
  loaderData,
  fetcherData,
  getNearestPageAvailable,
}: UseListingData<Model>): {
  data: SimpleListingResponse<Model> | undefined;
  isFetchingList: boolean;
} => {
  const [data, setData] = useState(loaderData);
  const [currentSearchParams] = useSearchParams();

  const isFetchingList = useMemo(() => {
    return !data || fetcherData.state === 'loading' || fetcherData.state === 'submitting';
  }, [data, fetcherData.state]);

  useEffect(() => {
    if (fetcherData.data) {
      if (
        isEmpty(fetcherData.data.info.hits) &&
        !!currentSearchParams.get('page') &&
        currentSearchParams.get('page') !== fetcherData.data.page.toString()
      ) {
        getNearestPageAvailable(fetcherData.data.page);
      } else {
        setData(fetcherData.data);
      }
      if (typeof fetcherData.data.toastMessageError === 'string') {
        notification.error({
          message: fetcherData.data?.toastMessageError,
          description: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData.data]);

  useEffect(() => {
    if (loaderData) {
      if (
        isEmpty(loaderData.info.hits) &&
        !!currentSearchParams.get('page') &&
        currentSearchParams.get('page') !== loaderData.page.toString()
      ) {
        getNearestPageAvailable(loaderData.page);
      } else {
        setData(loaderData);
      }
    }
    if (loaderData?.toastMessageError) {
      notification.error({
        message: loaderData.toastMessageError,
        description: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return {
    data,
    isFetchingList,
  };
};
