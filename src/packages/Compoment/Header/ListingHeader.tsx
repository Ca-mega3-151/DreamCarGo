import { Input, Button } from 'antd';
import { FC, ReactNode } from 'react';

export interface ListingHeaderProps {
  title: ReactNode;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
  searchPlaceholder?: string;
  creatable?: boolean;
  onCreate?: () => void;
  filters?: ReactNode;
  createBtnText?: string;
}

export const ListingHeader: FC<ListingHeaderProps> = ({
  title,
  searchValue,
  setSearchValue,
  onSearch,
  searchPlaceholder = 'Tìm kiếm...',
  createBtnText = 'Thêm mới',
  creatable = true,
  onCreate,
  filters,
}) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-1">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        {filters}

        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={e => {
            return setSearchValue(e.target.value);
          }}
          onPressEnter={onSearch}
          style={{ width: '300px' }}
        />

        {creatable && (
          <Button type="primary" onClick={onCreate}>
            {createBtnText}
          </Button>
        )}
      </div>
    </div>
  );
};
