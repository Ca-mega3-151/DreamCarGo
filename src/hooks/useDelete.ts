import axios from 'axios';

export const useDelete = (refresh: () => void) => {
  const deleteTransaction = async (id: string) => {
    try {
      await axios.delete(`/api/listing/${id}`);
      refresh();
    } catch (err) {
      console.error('Lỗi khi xóa :', err);
    }
  };

  return { deleteTransaction };
};
