import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Alert, Table, Tag } from 'antd';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ArticleFormListingHeader } from './ArticleHeader';
import { useListing } from '~/hooks/useListing';
import { TableActions } from '~/shared/ReactJS';

export const ArticleTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { isLoading, data, error } = useListing(searchTerm);

  const fakeData = [
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
  ];

  const dataSource = data.length > 0 ? data : fakeData;

  const filteredData = dataSource.filter(item => {
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
        const onEdit = (record: any) => {
          console.log('Edit', record);
        };
        const onView = (record: any) => {
          navigate(`/article/detail?id=${record.id}`);
        };
        const onDelete = (record: any) => {
          console.log('Delete', record);
        };
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: 'Sửa',
                icon: <EditOutlined className="!text-sm" />,
                onClick: () => {
                  return onEdit(record);
                },
              },
              {
                key: '2',
                label: 'Xem',
                icon: <EyeOutlined className="!text-sm" />,
                onClick: () => {
                  return onView(record);
                },
              },
              {
                key: '3',
                label: 'Xóa',
                icon: <DeleteOutlined className="!text-sm" />,
                onClick: () => {
                  return onDelete(record);
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
        creatable
        createBtnText="Thêm mới"
        setSearchTerm={setSearchTerm}
        setSearchValue={setSearchValue}
        onCreate={() => {
          return navigate('/article/create');
        }}
      />
      {error && <Alert message="Lỗi tải dữ liệu!" type="error" showIcon />}
      <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} loading={isLoading} />
    </div>
  );
};
