import { FormArticle } from '../FormMutation/FormMutation';
import { Article } from '../models/article';

import { useEdit } from '~/hooks/useEdit';

export const ArticleEdit = () => {
  const { formValues, isLoading, isSubmitting, handleSave } = useEdit<Article>({
    apiFetchFunction: async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            id: '123',
            title: 'Bài viết mẫu',
            status: 'draft',
            catalogue: 'tech',
            url: 'https://example.com',
            content: 'Đây là nội dung bài viết mẫu',
            createdAt: new Date().toISOString(),
            employeeAt: 'John Doe',
          });
        }, 1000);
      });
    },
    updateFunction: async (id, data) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Updated Data:', id, data);
          resolve(true);
        }, 500);
      });
    },
    getDefaultValues: data => {
      return data;
    },
  });

  if (!formValues || isLoading) {
    return <div className="py-10 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <FormArticle uid="article-edit-form" isSubmitting={isSubmitting} defaultValues={formValues} onSubmit={handleSave} />
  );
};
