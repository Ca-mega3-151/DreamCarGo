import { notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DeleteHookProps {
  apiDeleteFunction: (id: string) => Promise<any>;
  getRedirectUrl?: () => string;
}

export function useDelete({ apiDeleteFunction, getRedirectUrl }: DeleteHookProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await apiDeleteFunction(id);
      notification.success({ message: 'Xóa thành công!' });

      if (getRedirectUrl) {
        navigate(getRedirectUrl());
      } else {
        navigate(-1);
      }
    } catch (err) {
      const errorMessage = (err as any)?.message || 'Lỗi khi xóa dữ liệu';
      setError(errorMessage);
      notification.error({ message: 'Xóa thất bại', description: errorMessage });
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, error, handleDelete };
}
