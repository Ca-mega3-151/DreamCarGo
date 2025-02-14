import { Form, Input, Select, Spin } from 'antd';
import { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { getFormArticleSchema } from './zodResolver';
import { useCreate } from '~/hooks/useCreate';
import { CreateHeader } from '~/packages/Compoment/Header/CreateHeader';
import { Field } from '~/shared/ReactJS';
import { DeepPartial, DeepUnpartial, FormMutationStateValues } from '~/shared/TypescriptUtilities';

export interface FormArticleValues extends TypeOf<ReturnType<typeof getFormArticleSchema>> {}

export type FormArticleStateValues = FormMutationStateValues<DeepUnpartial<FormArticleValues>>;

export interface FormArticleProps {
  uid: string;
  isSubmitting: boolean;
  defaultValues: FormArticleStateValues;
  fieldsError?: DeepPartial<Record<keyof FormArticleValues, string>>;
  disabled?: boolean;
  onSubmit?: (values: FormArticleValues) => void;
}

export const FormArticle = forwardRef<FormArticleProps, FormArticleProps>(props => {
  const { uid, defaultValues } = props;

  const { formValues, isLoading, handleChange, handleSave } = useCreate<FormArticleValues>({
    apiCreateFunction: async data => {
      return fetch(`/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    getDefaultValues: () => {
      return defaultValues;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormArticleValues>({
    mode: 'onSubmit',
    defaultValues: formValues || defaultValues, // Ensure default values are being used
    resolver: async data => {
      try {
        const result = await getFormArticleSchema().parseAsync(data);
        return { values: result, errors: {} };
      } catch (error) {
        return { values: {}, errors: (error as any).formErrors.fieldErrors };
      }
    },
  });

  useEffect(() => {
    if (formValues) {
      Object.keys(formValues).forEach(key => {
        setValue(key as keyof FormArticleValues, formValues[key as keyof FormArticleValues]);
      });
    }
  }, [formValues, setValue]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const onSubmit = (_data: FormArticleValues) => {
    handleSave();
  };

  return (
    <div>
      <CreateHeader />
      <Form method="POST" id={uid} onFinish={handleSubmit(onSubmit)} className="rounded-xl bg-white p-4">
        <div className="grid grid-cols-2 gap-4 border p-4">
          <div className="space-y-4">
            <Field label="Tiêu đề bài viết" error={errors.title?.message}>
              <Input
                placeholder="Tiêu đề bài viết"
                value={formValues?.title}
                onChange={e => {
                  handleChange('title', e.target.value);
                }}
              />
            </Field>
            <Field label="Trạng thái" error={errors.status?.message}>
              <Select
                className="w-full"
                placeholder="Chọn trạng thái"
                value={formValues?.status}
                onChange={value => {
                  handleChange('status', value);
                }}
              >
                <Select.Option value="published">Đã xuất bản</Select.Option>
                <Select.Option value="draft">Bản nháp</Select.Option>
                <Select.Option value="pending">Chờ duyệt</Select.Option>
              </Select>
            </Field>
          </div>
          <div className="space-y-4">
            <Field label="Danh mục" error={errors.catalogue?.message}>
              <Select
                className="w-full"
                placeholder="Chọn danh mục"
                value={formValues?.catalogue || undefined}
                onChange={value => {
                  handleChange('catalogue', value);
                }}
              >
                <Select.Option value="tech">Công nghệ</Select.Option>
                <Select.Option value="business">Kinh doanh</Select.Option>
              </Select>
            </Field>
            <Field label="Đường dẫn bài viết" error={errors.url?.message}>
              <Input
                placeholder="Nhập địa chỉ url"
                {...register('url')}
                value={formValues?.url || ''}
                onChange={e => {
                  handleChange('url', e.target.value);
                }}
              />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Nội dung" error={errors.content?.message}>
              <Input.TextArea
                placeholder="Nhập nội dung"
                rows={5}
                {...register('content')}
                value={formValues?.content || ''}
                onChange={e => {
                  handleChange('content', e.target.value);
                }}
              />
            </Field>
          </div>
        </div>
      </Form>
    </div>
  );
});

FormArticle.displayName = 'FormArticle';
