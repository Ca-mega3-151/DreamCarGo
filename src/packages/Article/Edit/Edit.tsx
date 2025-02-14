import { forwardRef, useEffect } from 'react';
import { useEdit } from '~/hooks/useEdit';
import { FormArticle, FormArticleValues } from '~/packages/Article/FormMutation/FormMutation';
import { articleModelToDefaultValuesOfFormMutation } from '~/packages/Article/utils/articleModelToDefaultValuesOfFormMutation';

const fetchArticleAPI = async (id: string): Promise<FormArticleValues & { id: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id, // 🛠 THÊM ID vào đây để khớp với kiểu dữ liệu của Article
        title: 'Hướng dẫn sử dụng React',
        status: 'published',
        catalogue: 'tech',
        url: 'https://example.com/react-guide',
        content: 'Nội dung bài viết...',
        createdAt: '2025-02-14',
        employeeAt: 'Nguyễn Văn A',
      });
    }, 500);
  });
};

const updateArticleAPI = async (id: string, data: Partial<FormArticleValues>) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, ...data, updatedAt: new Date().toISOString() });
    }, 1000);
  });
};

interface ArticleEditProps {
  id: string;
}

export const ArticleEdit = forwardRef<unknown, ArticleEditProps>(({ id }, ref) => {
  const { formValues, isLoading, isSubmitting, handleSave } = useEdit({
    apiFetchFunction: () => {
      return fetchArticleAPI(id);
    },
    updateFunction: updateArticleAPI,
    getDefaultValues: data => {
      return articleModelToDefaultValuesOfFormMutation({ article: data });
    },
  });

  useEffect(() => {
    if (formValues) {
      console.log('Dữ liệu đã tải:', formValues);
    }
  }, [formValues]);

  if (isLoading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <FormArticle
      uid="edit-article"
      isSubmitting={isSubmitting}
      defaultValues={formValues}
      onSubmit={handleSave}
      ref={ref as any}
    />
  );
});

ArticleEdit.displayName = 'ArticleEdit';
