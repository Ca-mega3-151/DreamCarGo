import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalWithI18n } from '../../../ModalWithI18n';
import { ListingColumnType, ListingTable } from '../../ListingTable';
import { ValidateServiceResponse } from './types/ValidateServiceResponse';
import { Button, ModalProps, notification, Tabs, Tag } from '~/shared/ReactJS';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export interface ModalPreviewProps<T extends ValidateServiceResponse> extends Pick<ModalProps, 'open' | 'onCancel'> {
  importType: string;
  validateResponse: T | undefined;
  importService: (validRecords: ValidNRawRecord<T>[], inValidRecords: InvalidRecord<T>[]) => Promise<void>;
  onImportSuccess: () => void;
  columns: ListingColumnType<T['items'][number]>[];
  onUploadNew: () => void;
}

type InvalidRecord<T extends ValidateServiceResponse> = T['items'][number] & {
  messages: string[];
};
type ValidNRawRecord<T extends ValidateServiceResponse> = T['items'][number];
export const ModalPreview = <T extends ValidateServiceResponse>({
  importService,
  onImportSuccess,
  onCancel,
  onUploadNew,
  open,
  importType,
  validateResponse,
  columns,
}: ModalPreviewProps<T>) => {
  const { t } = useTranslation(['components', 'common']);

  const [isImporting, setIsImporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabActive, setTabActive] = useState<'all' | 'valid' | 'invalid'>('all');

  const validRecords: ValidNRawRecord<T>[] = useMemo(() => {
    return (validateResponse?.items ?? []).filter((_, index) => {
      return !validateResponse?.errors.find(error => {
        return error.itemIndex === index;
      })?.messages.length;
    });
  }, [validateResponse]);

  const invalidRecords: InvalidRecord<T>[] = useMemo(() => {
    if (!validateResponse?.hasError) {
      return [];
    }

    return (validateResponse?.items ?? []).reduce<InvalidRecord<T>[]>((result, item, index) => {
      const error = validateResponse?.errors.find(error => {
        return error.itemIndex === index;
      });
      if (error?.messages.length) {
        return result.concat({
          ...item,
          messages: error.messages,
        } as InvalidRecord<T>);
      }
      return result;
    }, []);
  }, [validateResponse]);

  const data: InvalidRecord<T>[] | ValidNRawRecord<T>[] = useMemo(() => {
    if (tabActive === 'all') {
      return validateResponse?.items ?? [];
    }
    if (tabActive === 'invalid') {
      return invalidRecords;
    }
    if (tabActive === 'valid') {
      return validRecords;
    }
    return validateResponse?.items ?? [];
  }, [validateResponse, validRecords, invalidRecords, tabActive]);

  const handleCancel: ModalProps['onCancel'] = () => {
    onCancel?.();
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      await importService?.(validRecords, invalidRecords);
      onImportSuccess?.();
      notification.success({
        message: t('components:ModalPreview.import_success'),
      });
    } catch (error) {
      notification.error({
        message: t('components:ModalPreview.import_error'),
        description: handleCatchClauseAsMessage({ error, t }),
      });
    } finally {
      setIsImporting(false);
    }
  };

  const totalRecords = data?.length ?? 0;
  const pageSize = 20;
  return (
    <ModalWithI18n
      open={open}
      afterClose={() => {
        setCurrentPage(1);
        setTabActive('all');
      }}
      onCancel={handleCancel}
      confirmLoading={isImporting}
      title={t('components:ModalPreview.title', { type: importType.toLowerCase() })}
      width={1600}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button onClick={onCancel}>{t('components:Modal.cancel')}</Button>
          {!!validRecords.length && (
            <Button className={!invalidRecords.length ? 'hidden' : ''} onClick={onUploadNew}>
              {t('components:ModalPreview.upload_new')}
            </Button>
          )}
          {!!validRecords.length && (
            <Button loading={isImporting} color="primary" onClick={handleImport}>
              {invalidRecords.length
                ? t('components:ModalPreview.import_and_skip_error_records')
                : t('components:ModalPreview.import_records')}
            </Button>
          )}
        </div>
      }
    >
      <Tabs
        className={validateResponse?.hasError ? '' : 'hidden'}
        onChange={value => {
          return setTabActive(value as typeof tabActive);
        }}
        tabActive={tabActive}
        tabs={[
          {
            key: 'all',
            label: (
              <div>
                {t('components:ModalPreview.all')} ({validateResponse?.items?.length ?? 0})
              </div>
            ),
          },
          {
            key: 'valid',
            label: (
              <div>
                {t('components:ModalPreview.valid')} ({validRecords.length ?? 0})
              </div>
            ),
          },
          {
            key: 'invalid',
            label: (
              <div>
                {t('components:ModalPreview.invalid')} ({invalidRecords.length ?? 0})
              </div>
            ),
          },
        ]}
      />
      <ListingTable
        autoIndex={false}
        recordKey={record => {
          return record['_id'];
        }}
        pagination={{
          currentPage,
          pageSize,
          totalRecords,
          onPaginationChange: ({ page }) => {
            return setCurrentPage(page);
          },
        }}
        dataSource={data}
        columns={[
          {
            width: 54,
            align: 'center',
            title: '#',
            render: (_, index) => {
              return pageSize * (currentPage - 1) + index + 1;
            },
          },
          ...(columns as any),
          {
            width: 240,
            fixed: 'right',
            align: 'center',
            hidden: !validateResponse?.hasError || tabActive === 'valid',
            title: t('components:ModalPreview.status'),
            render: (record, index) => {
              let hasError = false;
              if (tabActive === 'all') {
                const realIndex = pageSize * (currentPage - 1) + index;
                hasError = !!validateResponse?.errors.find(error => {
                  return error.itemIndex === realIndex;
                })?.messages.length;
              } else {
                const record_ = record as InvalidRecord<T>;
                hasError = !!record_.messages.length;
              }
              if (hasError) {
                return <Tag color="error">{t('components:ModalPreview.invalid')}</Tag>;
              }
              return <Tag color="success">{t('components:ModalPreview.valid')}</Tag>;
            },
          },
          {
            width: 240,
            fixed: 'right',
            hidden: !validateResponse?.hasError || tabActive === 'valid',
            title: t('components:ModalPreview.message'),
            render: (record, index) => {
              let messages: string[] = [];
              if (tabActive === 'all') {
                const realIndex = pageSize * (currentPage - 1) + index;
                messages =
                  validateResponse?.errors.find(error => {
                    return error.itemIndex === realIndex;
                  })?.messages ?? [];
              } else {
                const record_ = record as InvalidRecord<T>;
                messages = record_.messages ?? [];
              }
              return (
                <ul className="list-disc pl-3">
                  {messages.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              );
            },
          },
        ]}
      />
    </ModalWithI18n>
  );
};
