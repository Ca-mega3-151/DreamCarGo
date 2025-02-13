import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconAddLinear } from '~/components/Icons/IconAddLinear';
import { useIsMobile } from '~/hooks/useIsMobile';
import { Button } from '~/shared/ReactJS';

export interface ListingHeaderProps {
  title: ReactNode;
  exportBtn?: ReactNode;
  importBtn?: ReactNode;
  createBtn?: ReactNode;
  creatable?: boolean;
  exportable?: boolean;
  importable?: boolean;
  onExport?: () => void;
  onImport?: () => void;
  onCreate?: () => void;
  isExporting?: boolean;
}

export const ListingHeader: FC<ListingHeaderProps> = ({
  title,
  exportBtn,
  exportable = false,
  importBtn,
  importable = false,
  createBtn,
  creatable = false,
  onCreate,
  onExport,
  onImport,
  isExporting,
}) => {
  const { t } = useTranslation(['components']);
  const isMobile = useIsMobile();

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-1">
      <div className={classNames('font-semibold', isMobile ? 'text-xl' : 'text-2xl')}>{title}</div>
      <div className="flex items-center gap-2">
        {exportable && (
          <Button
            size={isMobile ? 'small' : undefined}
            loading={isExporting}
            onClick={onExport}
            icon={<ExportOutlined />}
          >
            {exportBtn ?? t('components:ListingHeader.export')}
          </Button>
        )}
        {importable && (
          <Button
            size={isMobile ? 'small' : undefined}
            onClick={onImport}
            className="hidden sm:flex"
            icon={<ImportOutlined />}
          >
            {importBtn ?? t('components:ListingHeader.import')}
          </Button>
        )}
        {creatable && (
          <Button size={isMobile ? 'small' : undefined} onClick={onCreate} icon={<IconAddLinear />} color="primary">
            {createBtn ?? t('components:ListingHeader.create')}
          </Button>
        )}
      </div>
    </div>
  );
};
