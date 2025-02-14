import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';

interface Pagination {
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  page: number;
}

interface ListingTableHookProps<T> {
  initialParams: Record<string, any>;
  apiFetchFunction: (params: any) => Promise<{ items: T[]; total: number; totalsByStatus?: Record<string, number> }>;
  defaultPageSize?: number;
  totalPagesFunction?: (totalRecords: number, pageSize: number) => number;
}

export function useListingTable<T>({
  initialParams,
  apiFetchFunction,
  defaultPageSize = 10,
  totalPagesFunction = (totalRecords, pageSize) => {
    return Math.ceil(totalRecords / pageSize);
  },
}: ListingTableHookProps<T>) {
  const navigate = useNavigate();

  const [paramsInUrl, setParamsInUrl] = useState(initialParams);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalPages: 1,
    totalRecords: 0,
    pageSize: defaultPageSize,
    page: initialParams['page'] || 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (params: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiFetchFunction(params);
        setData(response.items);
        setCounts(response.totalsByStatus || {});
        setPagination({
          totalPages: totalPagesFunction(response.total, params.pageSize || defaultPageSize),
          totalRecords: response.total,
          pageSize: params.pageSize || defaultPageSize,
          page: params.page || 1,
        });
      } catch (err) {
        setError((err as any)?.message || 'Lỗi xảy ra, vui lòng thử lại!');
        const errorMessage = (err as any)?.message || 'Lỗi xảy ra, vui lòng thử lại!';
        notification.error({ message: 'Lỗi tải dữ liệu', description: errorMessage });
      } finally {
        setIsLoading(false);
      }
    },
    [apiFetchFunction, defaultPageSize, totalPagesFunction],
  );

  const handleRequest = (newParams: Record<string, any>) => {
    const updatedParams = { ...paramsInUrl, ...newParams };
    setParamsInUrl(updatedParams);
    const urlSearchParams = new URLSearchParams(updatedParams);
    updateURLSearchParamsOfBrowserWithoutNavigation(urlSearchParams);
    fetchData(updatedParams);
  };

  useEffect(() => {
    fetchData(paramsInUrl);
  }, []);

  return {
    data,
    counts,
    pagination,
    isLoading,
    error,
    handleRequest,
    navigate,
  };
}
