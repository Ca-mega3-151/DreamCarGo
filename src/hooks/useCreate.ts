import axios from 'axios';

export const useCreate = (refresh: () => void) => {
  const createTransaction = async (transaction: any) => {
    try {
      await axios.post('/api/listing', transaction);
      refresh();
    } catch (err) {
      console.error('Lỗi khi tạo giao dịch:', err);
    }
  };

  return { createTransaction };
};
