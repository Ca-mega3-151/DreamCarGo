import axios from 'axios';

export const useEdit = (refresh: () => void) => {
  const updateTransaction = async (id: string, transaction: any) => {
    try {
      await axios.put(`/api/listing/${id}`, transaction);
      refresh(); // Tải lại danh sách sau khi cập nhật
    } catch (err) {
      console.error('Lỗi khi cập nhật giao dịch:', err);
    }
  };

  return { updateTransaction };
};
