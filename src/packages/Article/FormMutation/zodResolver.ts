import { z } from 'zod';

export const getFormArticleSchema = () => {
  return z.object({
    title: z.string().min(1, { message: 'Tiêu đề không được để trống' }),
    status: z.string().min(1, { message: 'Trạng thái không được để trống' }),
    createdAt: z.string().min(1, { message: 'Ngày tạo không được để trống' }),
    employeeAt: z.string().min(1, { message: 'Người tạo không được để trống' }),
    catalogue: z.string().min(1, { message: 'Danh mục không được để trống' }),
    url: z.string().min(1, { message: 'Đường dẫn không được để trống' }),
    content: z.string().min(1, { message: 'Nội dung không được để trống' }),
  });
};
