import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isCanRead } from '../../constants/Is/IsCanRead';
import { getStatusMappingToLabels } from '../../constants/StatusMappingToLabels';
import { StatusMappingToTagColor } from '../../constants/StatusMappingToTagColor';
import { Branding } from '../../models/Branding';
import { BrandingListingFilterValues, BrandingListingSortValues } from '../../utils/listingUrlSearchParams';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { StickyAction } from '~/components/Listing/ListingTable/src/StickyAction';
import { SelectRecordStatus } from '~/packages/_Enums/RecordStatus/components/SelectRecordStatus';
import { Input, TableActions, Tag } from '~/shared/ReactJS';
import { dayjs } from '~/shared/Utilities';

interface Props
  extends Omit<
    ListingTableProps<Branding, keyof BrandingListingSortValues | keyof BrandingListingFilterValues>,
    'columns' | 'recordKey' | 'select'
  > {
  editAction?: {
    editable: boolean;
    onEdit: (record: Branding) => void;
  };
  deleteAction?: {
    deletable: boolean;
    onDelete: (record: Branding) => void;
    onDeleteMany: (record: Branding[]) => void;
  };
  exportAction?: {
    exportable: boolean;
    onExport: (record: Branding[]) => void;
  };
  select?: Omit<
    Exclude<
      ListingTableProps<Branding, keyof BrandingListingSortValues | keyof BrandingListingFilterValues>['select'],
      undefined
    >,
    'renderStickyAction'
  >;
}

export const BrandingListingTable = ({ editAction, deleteAction, exportAction, ...props }: Props) => {
  const { totalRecords } = props.pagination;
  const { t } = useTranslation(['branding', 'components']);

  const StatusMappingToLabels = useMemo(() => {
    return getStatusMappingToLabels(t);
  }, [t]);

  const columns = useMemo(() => {
    const data: Array<
      ListingColumnType<Branding, keyof BrandingListingSortValues | keyof BrandingListingFilterValues>
    > = [
      {
        uid: 'brandingCode',
        title: t('branding:code'),
        width: 320,
        render: record => {
          return <div>{record.brandingCode}</div>;
        },
        hidden: !isCanRead(['brandingCode']),
        actions: {
          key: 'brandingCode',
          filter: {
            enable: true,
            content: (value, onChange) => {
              return <Input placeholder={t('branding:code')} value={value} onChange={onChange} />;
            },
          },
          sort: {
            enable: true,
          },
        },
      },
      {
        uid: 'name',
        title: t('branding:name'),
        width: 320,
        render: record => {
          return record.brandingName;
        },
        hidden: !isCanRead(['brandingName']),
      },
      {
        uid: 'status',
        title: t('branding:status'),
        width: 160,
        render: record => {
          return <Tag color={StatusMappingToTagColor[record.status]}>{StatusMappingToLabels[record.status]}</Tag>;
        },
        align: 'center',
        hidden: !isCanRead(['status']),
        actions: {
          key: 'status',
          filter: {
            enable: true,
            content: (value, onChange) => {
              return <SelectRecordStatus placeholder={t('branding:status')} status={value} onChange={onChange} />;
            },
          },
        },
      },
      {
        uid: 'updated_by',
        defaultVisible: false,
        title: t('branding:updated_by'),
        width: 320,
        render: record => {
          return record.updatedBy || record.createdBy;
        },
        hidden: !isCanRead(['updatedBy', 'createdBy']),
      },
      {
        uid: 'updated_at',
        title: t('branding:updated_at'),
        width: 160,
        render: record => {
          return dayjs(record.updatedAt).format('DD/MM/YYYY HH:mm');
        },
        hidden: !isCanRead(['updatedAt']),
      },
      {
        uid: 'action',
        title: t('components:ListingTable.actions'),
        width: 120,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '1',
                  label: t('branding:edit'),
                  icon: <EditOutlined />,
                  onClick: () => {
                    return editAction?.onEdit?.(record);
                  },
                  hidden: !editAction?.editable,
                },
                {
                  key: '2',
                  danger: true,
                  label: t('branding:delete'),
                  icon: <DeleteOutlined />,
                  onClick: () => {
                    return deleteAction?.onDelete?.(record);
                  },
                  hidden: !deleteAction?.deletable,
                },
              ]}
            />
          );
        },
      },
    ];

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <ListingTable<Branding>
      {...props}
      columns={columns}
      recordKey={record => {
        return record._id;
      }}
      select={{
        ...props.select,
        renderStickyAction: ({ selectedRecords, clear }) => {
          return (
            <StickyAction
              totalSelectedRecords={selectedRecords.length}
              totalRecords={totalRecords ?? 0}
              exportable={exportAction?.exportable}
              onExport={() => {
                return exportAction?.onExport?.(selectedRecords);
              }}
              deletable={deleteAction?.deletable}
              onDelete={() => {
                return deleteAction?.onDeleteMany?.(selectedRecords);
              }}
              onClear={clear}
            />
          );
        },
      }}
    />
  );
};
