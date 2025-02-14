import { notification } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../models/article';
import { useDetail } from '~/hooks/useDetail';

export const ArticleDetail = () => {
  const navigate = useNavigate();

  const { data: article, isLoading } = useDetail<Article>({
    apiFetchFunction: async params => {
      return fetch(`/api/articles/${params.id}`).then(res => {
        return res.json();
      });
    },
    deleteFunction: async id => {
      return fetch(`/api/articles/${id}`, { method: 'DELETE' });
    },
  });

  const [formValues, setFormValues] = useState<Article | null>(null);

  useMemo(() => {
    if (article) {
      setFormValues(article);
    }
  }, [article]);

  const handleChange = (key: keyof Article, value: string) => {
    if (formValues) {
      setFormValues({ ...formValues, [key]: value });
    }
  };

  const handleSave = async () => {
    if (!formValues) {
      return;
    }
    try {
      const response = await fetch(`/api/articles/${formValues.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Lưu thất bại!');
      }

      notification.success({ message: 'Cập nhật bài viết thành công!' });
      navigate('/articles');
    } catch (error) {
      if (error instanceof Error) {
        notification.error({ message: 'Lỗi khi lưu bài viết', description: error.message });
      } else {
        notification.error({ message: 'Lỗi khi lưu bài viết' });
      }
    }
  };

  if (!formValues || isLoading) {
    return <div className="py-10 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <h2 className="text-xl font-semibold">Chỉnh sửa bài viết #{formValues.id}</h2>
      <div className="rounded-md border bg-white p-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Tiêu đề bài viết
        </label>
        <input
          id="title"
          type="text"
          className="mt-1 w-full rounded border px-3 py-2"
          value={formValues.title}
          onChange={e => {
            return handleChange('title', e.target.value);
          }}
        />
      </div>

      <div className="rounded-md border bg-white p-4">
        <label htmlFor="catalogue" className="block text-sm font-medium">
          Danh mục
        </label>
        <input
          id="catalogue"
          type="text"
          className="mt-1 w-full rounded border px-3 py-2"
          value={formValues.catalogue}
          onChange={e => {
            return handleChange('catalogue', e.target.value);
          }}
        />
      </div>

      <div className="rounded-md border bg-white p-4">
        <label htmlFor="status" className="block text-sm font-medium">
          Trạng thái
        </label>
        <input
          id="status"
          type="text"
          className="mt-1 w-full rounded border px-3 py-2"
          value={formValues.status}
          onChange={e => {
            return handleChange('status', e.target.value);
          }}
        />
      </div>

      <div className="rounded-md border bg-white p-4">
        <label htmlFor="content" className="block text-sm font-medium">
          Nội dung
        </label>
        <textarea
          id="content"
          className="mt-1 w-full rounded border px-3 py-2"
          rows={6}
          value={formValues.content}
          onChange={e => {
            return handleChange('content', e.target.value);
          }}
        />
      </div>

      <div className="space-x-2 flex justify-end">
        <button
          className="rounded bg-gray-300 px-4 py-2"
          onClick={() => {
            return navigate('/articles');
          }}
        >
          Hủy bỏ
        </button>
        <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={handleSave}>
          Lưu lại
        </button>
      </div>
    </div>
  );
};
