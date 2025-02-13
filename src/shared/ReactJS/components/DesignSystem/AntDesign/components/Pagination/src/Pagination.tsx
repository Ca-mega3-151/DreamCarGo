import { Pagination as AntPagination, PaginationProps as AntPaginationProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import './styles.css';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<AntPaginationProps, 'className' | 'pageSize' | 'onChange' | 'showSizeChanger' | 'disabled' | 'size'> {
  /** Custom page size options for the pagination. */
  pageSizeOptions?: number[];
  /** Custom text to display for page size. */
  pageSizeText?: string;
  /** The current page number. */
  currentPage: number;
  /** The number of items per page. */
  pageSize: number;
  /** The total number of items. */
  total: number;
}

/**
 * Pagination component extends the functionality of the Ant Design Pagination component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Pagination component.
 *
 * @param {Props} props - The properties for the Pagination component.
 * @param {string} [props.className] - Custom CSS class for styling the pagination component.
 * @param {number} props.currentPage - The current page number.
 * @param {boolean} [props.disabled] - Whether the pagination is disabled.
 * @param {Function} [props.onChange] - Callback function triggered when the page or page size changes.
 * @param {number} props.pageSize - The number of items per page.
 * @param {number[]} [props.pageSizeOptions=[]] - Custom page size options for the pagination.
 * @param {string} [props.pageSizeText='/ page'] - Custom text to display for page size.
 * @param {boolean} [props.showSizeChanger=false] - Whether to show the size changer in pagination.
 * @param {number} props.total - The total number of items.
 * @param {string} props.size - The size of pagination.
 * @returns {ReactNode} The rendered Pagination component.
 */
export const Pagination: FC<Props> = ({
  className,
  currentPage,
  disabled,
  onChange,
  pageSize,
  pageSizeOptions = [],
  pageSizeText = '/ page',
  showSizeChanger = false,
  total,
  size,
}) => {
  useInitializeContext();

  return (
    <AntPagination
      size={size}
      className={classNames('AntPagination__container', className)}
      disabled={disabled}
      pageSizeOptions={pageSizeOptions}
      showLessItems
      showQuickJumper={false}
      showSizeChanger={showSizeChanger}
      total={total}
      locale={{ items_per_page: pageSizeText }}
      current={currentPage}
      onChange={onChange}
      pageSize={pageSize}
    />
  );
};
