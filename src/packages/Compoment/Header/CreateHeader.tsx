import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/shared/ReactJS';

export const CreateHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex items-center justify-between border-b pb-4">
      <div>
        <h1 className="text-xl font-bold">Thêm mới bài viết</h1>
        <nav className="text-sm text-gray-500">
          <Link to="/article" className="text-blue-500">
            <span className="mr-2">Bài viết</span>
          </Link>{' '}
          &gt; <span className="text-black">Thêm mới bài viết</span>
        </nav>
      </div>

      <div className="space-x-4 flex">
        <Button
          onClick={() => {
            return navigate('/article');
          }}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Hủy bỏ
        </Button>
        <Button htmlType="submit" className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">
          Thêm mới
        </Button>
      </div>
    </div>
  );
};
