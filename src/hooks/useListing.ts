import axios from 'axios';
import { useState, useEffect } from 'react';

export const useListing = (searchTerm: string = '', filter: any = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('./listing', {
          params: {
            search: searchTerm,
            ...filter,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, filter]);

  return { isLoading, data, error };
};
