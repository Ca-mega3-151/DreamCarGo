import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification, useIsMounted } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { downloadAxiosResponse } from '~/utils/functions/downloadAxiosResponse';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export interface UseListing<SearchParams extends AnyRecord, Model extends AnyRecord> {
  defaultSearchParams?: SearchParams;
  defaultResponse?: {
    data: Model[];
    totalRecords: number;
    totalPages: number;
    page: number;
    pageSize?: number;
  };
  getList: (searchParams: SearchParams) => Promise<{
    data: Model[];
    totalRecords: number;
    totalPages: number;
    page: number;
    pageSize?: number;
  }>;
  export: (searchParams: SearchParams) => Promise<{
    blob: any[];
    fileName: string;
  }>;
}

export const useListing = <SearchParams extends AnyRecord, Model extends AnyRecord>({
  defaultSearchParams = {} as SearchParams,
  defaultResponse,
  getList,
  export: export_,
}: UseListing<SearchParams, Model>) => {
  const { t } = useTranslation(['common']);
  const isMounted = useIsMounted();

  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
  const [listingState, setListingState] = useState({
    data: defaultResponse?.data ?? [],
    totalRecords: defaultResponse?.totalRecords ?? 0,
    totalPages: defaultResponse?.totalPages ?? 0,
    page: defaultResponse?.page ?? 1,
    pageSize: defaultResponse?.pageSize ?? undefined,
    isLoading: false,
  });

  const handleGetList = async () => {
    setListingState(prevState => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    try {
      const response = await getList(searchParams);
      if (isEmpty(response.data)) {
        const avaliablePage = Math.min(response.page, response.totalPages);
        if (avaliablePage > 0) {
          setSearchParams(prevState => {
            return {
              ...prevState,
              page: avaliablePage,
            };
          });
          return;
        }
      }
      setListingState({
        data: response.data,
        totalRecords: response.totalRecords,
        totalPages: response.totalPages,
        page: response.page,
        pageSize: response.pageSize,
        isLoading: false,
      });
    } catch (error) {
      notification.error({
        message: t('common:error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
    } finally {
      setListingState(prevState => {
        return {
          ...prevState,
          isLoading: false,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (defaultResponse !== undefined && !isMounted) {
      return;
    }
    handleGetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isMounted]);

  const [isExporting, setIsExporting] = useState(false);
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await export_(searchParams);
      downloadAxiosResponse({ response: response.blob, fileName: response.fileName });
    } catch (error) {
      notification.error({
        message: t('common:error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    ...listingState,
    searchParams,
    setSearchParams,
    handleGetList,
    isExporting,
    handleExport,
  };
};
