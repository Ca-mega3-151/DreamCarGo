import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Table, Tag } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleFormListingHeader } from './ArticleHeader';
import { useDelete } from '~/hooks/useDelete';
import { useListingTable } from '~/hooks/useListing';
import { TableActions } from '~/shared/ReactJS';

// Fake API function
const deleteArticleAPI = async (id: string) => {
  return new Promise(resolve => {
    return setTimeout(() => {
      return resolve(`Deleted article ${id}`);
    }, 1000);
  });
};

export const ArticleTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { data, pagination, handleRequest, isLoading, error } = useListingTable({
    initialParams: { page: 1, pageSize: 5, search: '' },
    apiFetchFunction: async () => {
      return {
        items: [
          {
            id: '1',
            title: 'Hướng dẫn sử dụng React',
            catalogue: 'Lập trình',
            status: 'Đã xuất bản',
            statusColor: 'green',
            createdAt: '10/02/2025',
            employeeAt: 'Nguyễn Văn A',
          },
          {
            id: '2',
            title: 'Giới thiệu về TypeScript',
            catalogue: 'Lập trình',
            status: 'Chờ duyệt',
            statusColor: 'orange',
            createdAt: '12/02/2025',
            employeeAt: 'Trần Thị B',
          },
        ],
        total: 2,
      };
    },
  });

  const { isDeleting, handleDelete } = useDelete({
    apiDeleteFunction: deleteArticleAPI,
    getRedirectUrl: () => {
      return '/article';
    },
  });

  const filteredData = data.filter(item => {
    return (
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.employeeAt.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', width: 50 },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', width: 250 },
    { title: 'Danh mục', dataIndex: 'catalogue', key: 'catalogue', width: 180 },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (_: any, record: { status: string; statusColor: string }) => {
        return <Tag color={record.statusColor}>{record.status}</Tag>;
      },
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', width: 150 },
    { title: 'Nhân viên phụ trách', dataIndex: 'employeeAt', key: 'employeeAt', width: 200 },
    {
      id: 'action',
      width: 90,
      title: 'Hành động',
      render: (record: any) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: 'Sửa',
                icon: <EditOutlined className="!text-sm" />,
                onClick: () => {
                  navigate(`/article/edit`);
                },
              },
              {
                key: '2',
                label: 'Xóa',
                icon: <DeleteOutlined className="!text-sm" />,
                onClick: () => {
                  return handleDelete(record.id);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div>
      <ArticleFormListingHeader
        setSearchTerm={setSearchValue}
        creatable
        createBtnText="Thêm mới"
        setSearchValue={setSearchValue}
        onCreate={() => {
          return navigate('/article/create');
        }}
      />
      {error && <Alert message="Lỗi tải dữ liệu!" type="error" showIcon />}
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: pagination.pageSize, current: pagination.page, total: pagination.totalRecords }}
        loading={isLoading || isDeleting}
        onChange={pagination => {
          return handleRequest({ page: pagination.current, pageSize: pagination.pageSize });
        }}
      />
    </div>
  );
};
