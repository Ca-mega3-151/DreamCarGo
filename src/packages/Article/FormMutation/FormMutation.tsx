import { Form, Input, Select } from 'antd';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { getFormArticleSchema } from './zodResolver';
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
  onSubmit?: (values: FormArticleValues) => void;
  disabled?: boolean;
}

export const FormArticle = forwardRef<FormArticleProps, FormArticleProps>(props => {
  const { uid, defaultValues, onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormArticleStateValues>({
    mode: 'onSubmit',
    defaultValues,
    resolver: async data => {
      try {
        const result = await getFormArticleSchema().parseAsync(data);
        return { values: result, errors: {} };
      } catch (error) {
        const formErrors = (error as any).formErrors;
        return { values: {}, errors: formErrors.fieldErrors };
      }
    },
  });

  return (
    <div>
      <CreateHeader />
      <Form
        method="POST"
        id={uid}
        onFinish={handleSubmit(_values => {
          const validatedValues = {};
          onSubmit?.(validatedValues as FormArticleValues);
        })}
        className="rounded-xl bg-white p-4"
      >
        <div className="grid grid-cols-2 gap-4  border p-4">
          <div className="space-y-4 ">
            <Field label="Tiêu đề bài viết" error={errors.title?.message}>
              <Input placeholder="Tiêu đề bài viết" {...register('title')} />
            </Field>
            <Field label="Trạng thái" error={errors.status?.message}>
              <Select className="w-full" placeholder="Chọn trạng thái" {...register('status')}>
                <Select.Option value="published">Đã xuất bản</Select.Option>
                <Select.Option value="draft">Bản nháp</Select.Option>
                <Select.Option value="pending">Chờ duyệt</Select.Option>
              </Select>
            </Field>
          </div>
          <div className="space-y-4">
            <Field label="Danh mục" error={errors.catalogue?.message}>
              <Select className="w-full" placeholder="Chọn danh mục" {...register('catalogue')}>
                <Select.Option value="tech">Công nghệ</Select.Option>
                <Select.Option value="business">Kinh doanh</Select.Option>
              </Select>
            </Field>
            <Field label="Đường dẫn bài viết" error={errors.url?.message}>
              <Input placeholder="Nhập địa chỉ url" {...register('url')} />
            </Field>
          </div>
          {/* Hàng riêng biệt cho nội dung */}
          <div className="col-span-2">
            <Field label="Nội dung" error={errors.content?.message}>
              <Input.TextArea placeholder="Nhập nội dung" rows={5} {...register('content')} />
            </Field>
          </div>
        </div>
      </Form>
    </div>
  );
});

FormArticle.displayName = 'FormArticle';
