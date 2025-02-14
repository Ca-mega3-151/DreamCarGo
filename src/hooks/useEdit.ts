import { notification } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

interface EditHookProps<T> {
  apiFetchFunction: (params: any) => Promise<T>;
  updateFunction: (id: string, data: Partial<T>) => Promise<any>;
  getDefaultValues: (data: T) => any;
}

export function useEdit<T>({ apiFetchFunction, updateFunction, getDefaultValues }: EditHookProps<T>) {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  // const navigation = useNavigation();
  // const actionData = useActionData();

  const formActionsRef = useRef<any>(null);
  const isReadyNavigateAfterSubmit = useRef<boolean>(false);

  const [formValues, setFormValues] = useState<any | null>(null);
  const [originalValues, setOriginalValues] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiFetchFunction(loaderData.params);
      const defaultValues = getDefaultValues(response);
      setFormValues(defaultValues);
      setOriginalValues(defaultValues);
    } catch (err) {
      const errorMessage = (err as any)?.message || 'Lỗi khi tải dữ liệu';
      setError(errorMessage);
      notification.error({ message: 'Lỗi khi tải dữ liệu', description: errorMessage });
    }
  }, [apiFetchFunction, loaderData, getDefaultValues]);

  useEffect(() => {
    if (!formValues) {
      fetchData();
    }
  }, [fetchData, formValues]);

  const handleChange = (key: keyof T, value: any) => {
    setFormValues((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const isFormDirty = useCallback(() => {
    return JSON.stringify(formValues) !== JSON.stringify(originalValues);
  }, [formValues, originalValues]);

  const resetForm = () => {
    setFormValues(originalValues);
  };

  const handleSave = async () => {
    if (!formValues || !isFormDirty()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateFunction(loaderData.params.id, formValues);
      notification.success({ message: 'Cập nhật thành công!' });
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

  return {
    formValues,
    isLoading: !formValues && !error,
    isSubmitting,
    handleChange,
    handleSave,
    resetForm,
    navigate,
    isFormDirty,
    formActionsRef,
    error,
  };
}
