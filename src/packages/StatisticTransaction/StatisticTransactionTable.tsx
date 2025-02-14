import { Alert, Card, Table, Tag } from 'antd';
import { useState } from 'react';

import { StatisticTransactionFormListingHeader } from './StatisticTransactionHeader';
import { useListing } from '~/hooks/useListing';

export const StatisticTransactionTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading, data, error } = useListing(searchTerm);

  const fakeData = [
    {
      id: 1,
      orderCode: 'TT1001',
      customer: 'Nguyễn Văn A',
      amount: '1,500 ¥',
      paymentMethod: 'Paypal',
      status: 'Đã thanh toán',
      statusColor: 'green',
      orderDate: '15/02/2025 10:30',
    },
    {
      id: 2,
      orderCode: 'TT1002',
      customer: 'Trần Thị B',
      amount: '2,300 ¥',
      paymentMethod: 'Credit Card',
      status: 'Chờ thanh toán',
      statusColor: 'orange',
      orderDate: '16/02/2025 11:15',
    },
  ];
  const dataSource = data.length > 0 ? data : fakeData;
  const filteredData = dataSource.filter(item => {
    return (
      item.orderCode.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', width: 50 },
    { title: 'Order Code', dataIndex: 'orderCode', key: 'orderCode', width: 180 },
    { title: 'Customer', dataIndex: 'customer', key: 'customer', width: 200 },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: 150 },
    { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod', width: 200 },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (_: any, record: { status: string; statusColor: string }) => {
        return <Tag color={record.statusColor}>{record.status}</Tag>;
      },
    },
    { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate', width: 200 },
  ];

  return (
    <div>
      <StatisticTransactionFormListingHeader setSearchTerm={setSearchTerm} setSearchValue={setSearchValue} />
      {error && <Alert message="Lỗi tải dữ liệu!" type="error" showIcon />}

      <Card style={{ backgroundColor: '#000', color: '#fff', fontWeight: 'bold' }}>
        <div style={{ fontSize: '18px' }}>
          Tổng số giao dịch phát sinh: <span style={{ fontSize: '20px' }}>{data.length}</span>
        </div>
      </Card>
      <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} loading={isLoading} />
    </div>
  );
};
