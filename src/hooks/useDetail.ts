import { useCallback, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { notification } from '~/shared/ReactJS';

interface DetailHookProps<T> {
  apiFetchFunction: (params: any) => Promise<T>;
  deleteFunction?: (id: string) => Promise<any>; // Hàm xóa nếu có
  canEdit?: (data: T) => boolean;
  canDelete?: (data: T) => boolean;
}

export function useDetail<T>({ apiFetchFunction, deleteFunction, canEdit, canDelete }: DetailHookProps<T>) {
  const navigate = useNavigate();
  const { revalidate, state } = useRevalidator();
  const loaderData = useLoaderData();

  const [data, setData] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<string | false>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiFetchFunction(loaderData.params);
      setData(response);
    } catch (error) {
      notification.error({ message: 'Lỗi khi tải dữ liệu', description: (error as any)?.message });
    }
  }, [apiFetchFunction, loaderData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleFocus = () => {
      revalidate();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [revalidate]);

  const handleDelete = async () => {
    if (!deleteFunction || !isOpenDeleteModal) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteFunction(isOpenDeleteModal);
      notification.success({ message: 'Xóa thành công' });
      navigate(-1);
    } catch (error) {
      notification.error({ message: 'Xóa thất bại', description: (error as any)?.message });
    } finally {
      setIsDeleting(false);
      setIsOpenDeleteModal(false);
    }
  };

  return {
    data,
    isLoading: state === 'loading',
    isDeleting,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    handleDelete,
    canEdit: data ? canEdit?.(data) : false,
    canDelete: data ? canDelete?.(data) : false,
  };
}
