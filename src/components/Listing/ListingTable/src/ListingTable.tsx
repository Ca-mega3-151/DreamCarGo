import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TablePaginationMode, TableProps, useIsMounted } from '~/shared/ReactJS';
import { useResizeEvent } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { isBrowser } from '~/shared/Utilities';

export type Props<
  RecordType extends AnyRecord,
  ActionKey extends string = string,
  ExtraFilterValues extends AnyRecord = {},
> = Omit<
  TableProps<RecordType, ActionKey, ExtraFilterValues>,
  'paginationClassName' | 'showSizeChanger' | 'sizeChangerOptions' | 'tableHeight' | 'locale' | 'plural' | 'singular'
>;

interface State {
  scrollHeight: number | undefined;
}

const mappingPaginationModeToClassNames: Record<TablePaginationMode, string> = {
  none: '',
  sticky: '!-mx-yy-padding-xs md:!-mx-yy-padding',
};

export const ListingTable = <RecordType extends AnyRecord, ActionKey extends string = string>(
  props: Props<RecordType, ActionKey>,
) => {
  const { totalRecords, paginationMode = 'none' } = props.pagination;

  const { t } = useTranslation(['components']);

  const isMounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<State>({
    scrollHeight: undefined,
  });

  const mergedPaginationMode =
    paginationMode === 'none' && state.scrollHeight && state.scrollHeight <= 0 ? 'sticky' : paginationMode;
  const mergedTableHeight = state.scrollHeight && state.scrollHeight <= 0 ? undefined : state.scrollHeight;
  const handleResize = useCallback((): void => {
    if (!isMounted || !isBrowser() || paginationMode === 'sticky') {
      return;
    }

    const antPagination = containerRef.current?.querySelector('.yy-table-pagination') as HTMLElement | null;
    const $tableEl =
      (containerRef.current?.querySelector('.yy-table-content .yy-table-tbody') as HTMLElement | null) ||
      (containerRef.current?.querySelector('.yy-table-body table') as HTMLElement | null);

    const antTableTbodyClientRect = $tableEl?.getBoundingClientRect();
    const antTableHeight = antTableTbodyClientRect?.height ?? 0;
    const antTableTop = antTableTbodyClientRect?.top ?? 0;
    const antPaginationOffsetHeight = antPagination?.offsetHeight ?? 0;
    const nextScrollHeight = window.innerHeight - antTableTop - antPaginationOffsetHeight - 32;

    setState(state => {
      return {
        ...state,
        scrollHeight: nextScrollHeight > antTableHeight ? undefined : nextScrollHeight,
      };
    });
  }, [isMounted, paginationMode]);

  useResizeEvent(handleResize, [handleResize, props.dataSource?.length]);

  return (
    <div className="flex-1" ref={containerRef}>
      <Table
        {...props}
        tableHeight={mergedTableHeight}
        pagination={{
          ...props.pagination,
          paginationMode: mergedPaginationMode,
          showSizeChanger: true,
          sizeChangerOptions: [10, 20, 50, 100, 200],
          paginationClassName: mappingPaginationModeToClassNames[paginationMode],
          plural: ({ from, to }) => {
            return t('components:ListingTable.showing_range_results', {
              from,
              to,
              total: totalRecords,
            });
          },
          singular: ({ from, to }) => {
            return t('components:ListingTable.showing_range_result', {
              from,
              to,
              total: totalRecords,
            });
          },
        }}
        locale={{
          apply: t('components:ListingTable.apply'),
          reset: t('components:ListingTable.reset'),
          select_all: t('components:ListingTable.select_all'),
          columns_advance_config_title: t('components:ListingTable.columns_config'),
          show_current_state: ({ selected, total }) => {
            return t('components:ListingTable.quantity_columns_selected_on_total', { selected, total });
          },
          filter: t('components:ListingTable.filter'),
          columns_config: t('components:ListingTable.columns_config'),
          refresh: t('components:ListingTable.refresh'),
          search: t('components:ListingTable.search'),
        }}
      />
    </div>
  );
};
