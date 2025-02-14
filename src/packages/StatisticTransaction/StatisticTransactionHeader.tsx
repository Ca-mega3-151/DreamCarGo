import { Button } from 'antd';
import { useState } from 'react';
import { ListingHeader } from '../Compoment/Header/ListingHeader';

interface Props {
  setSearchValue: (value: string) => void;
  setSearchTerm: (value: string) => void;
}

export const StatisticTransactionFormListingHeader = ({ setSearchValue, setSearchTerm }: Props) => {
  const [searchValue, setLocalSearchValue] = useState('');

  return (
    <ListingHeader
      title="Giao dịch"
      searchValue={searchValue}
      setSearchValue={value => {
        setLocalSearchValue(value);
        setSearchValue(value);
      }}
      onSearch={() => {
        return setSearchTerm(searchValue);
      }}
      searchPlaceholder="Tìm kiếm"
      filters={<Button>Bộ lọc</Button>}
    />
  );
};
