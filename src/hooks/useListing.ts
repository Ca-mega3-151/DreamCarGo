import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

export const useListing = (searchTerm: string = '') => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/listing', { params: { search: searchTerm } });
      setData(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, data, error, refresh: fetchData };
};
