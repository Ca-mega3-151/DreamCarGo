import { notification } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

interface CreateHookProps<T> {
  apiCreateFunction: (data: Partial<T>) => Promise<any>;
  apiFetchFunction?: (params: any) => Promise<T>;
  getDefaultValues: (data?: T) => any;
}

export function useCreate<T>({ apiCreateFunction, apiFetchFunction, getDefaultValues }: CreateHookProps<T>) {
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const actionData = useActionData();
  const loaderData = useLoaderData();

  const formActionsRef = useRef<any>(null);
  const isReadyNavigateAfterSubmit = useRef<boolean>(false);

  const [formValues, setFormValues] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (apiFetchFunction) {
        const response = await apiFetchFunction(loaderData.params);
        setFormValues(getDefaultValues(response));
      } else {
        setFormValues(getDefaultValues());
      }
    } catch (err) {
      const errorMessage = (err as any)?.message || 'Lỗi khi tải dữ liệu';
      setError(errorMessage);
      notification.error({ message: 'Lỗi khi tải dữ liệu', description: errorMessage });
    }
  }, [apiFetchFunction, loaderData, getDefaultValues]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (key: keyof T, value: any) => {
    if (formValues) {
      setFormValues({ ...formValues, [key]: value });
    }
  };

  const handleSave = async () => {
    if (!formValues) {
      return;
    }

    setIsSubmitting(true);
    try {
      await apiCreateFunction(formValues);
      notification.success({ message: 'Tạo mới thành công!' });
      isReadyNavigateAfterSubmit.current = true;
      navigate(-1);
    } catch (err) {
      const errorMessage = (err as any)?.message || 'Lưu thất bại';
      setError(errorMessage);
      notification.error({ message: 'Lưu thất bại', description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDirty = useMemo(() => {
    return formActionsRef.current?.isDirty();
  }, [formValues]);

  return {
    formValues,
    isLoading: !formValues && !error,
    isSubmitting,
    handleChange,
    handleSave,
    navigate,
    isFormDirty,
    formActionsRef,
    error,
  };
}
