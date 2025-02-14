import { Button } from 'antd';
import { useState } from 'react';
import { ListingHeader } from '../Compoment/Header/ListingHeader';

interface Props {
  setSearchValue: (value: string) => void;
  setSearchTerm: (value: string) => void;
  onCreate: () => void;
  creatable: boolean;
  createBtnText?: string;
}

export const ArticleFormListingHeader = ({ setSearchValue, setSearchTerm, creatable, onCreate }: Props) => {
  const [searchValue, setLocalSearchValue] = useState('');

  return (
    <ListingHeader
      title="Bài viết"
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
      onCreate={onCreate}
      creatable={creatable}
      createBtnText="Thêm mới"
    />
  );
};
