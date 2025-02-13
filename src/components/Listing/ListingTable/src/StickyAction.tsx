import { CloseOutlined, ControlOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '~/hooks/useIsMobile';
import { Button, Dropdown, DropdownItem } from '~/shared/ReactJS';
import { useResizeEvent } from '~/shared/ReactJS';

interface Props {
  onClear: () => void;
  exportable?: boolean;
  onExport?: () => void;
  deletable?: boolean;
  onDelete?: () => void;
  totalSelectedRecords: number;
  totalRecords: number;
  Actions?: Array<Omit<DropdownItem, 'children'>>;
}

export const StickyAction: FC<Props> = ({
  onClear,
  onExport,
  onDelete,
  deletable = true,
  exportable = true,
  totalRecords,
  totalSelectedRecords,
  Actions = [],
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation(['components']);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<number | undefined>(undefined);
  const [isShorten, setIsShorten] = useState(false);

  const mergedActions = useMemo(() => {
    if (isShorten) {
      return [
        <Dropdown
          key="Actions"
          placement="top"
          items={[
            ...Actions.map<DropdownItem>(Action => {
              return {
                key: Action.key,
                label: Action.label,
                icon: Action.icon,
                onClick: Action.onClick,
              };
            }),
            {
              key: 'export',
              label: t('components:ListingTable.export'),
              icon: <ExportOutlined />,
              onClick: onExport,
              hidden: !exportable || !onExport,
            },
            {
              key: 'delete',
              label: t('components:ListingTable.delete'),
              icon: <DeleteOutlined />,
              onClick: onDelete,
              danger: true,
              hidden: !deletable || !onDelete,
            },
          ]}
        >
          <Button size="small" icon={<ControlOutlined />}>
            {t('components:ListingTable.actions')}
          </Button>
        </Dropdown>,
        <Button key="clear" size="small" onClick={onClear} icon={<CloseOutlined />} color="default" />,
      ];
    }
    const cloneActions = Actions.map(Action => {
      return (
        <Button key={Action.key} size="small" icon={Action.icon} children={Action.label} onClick={Action.onClick} />
      );
    });
    if (exportable && onExport) {
      cloneActions.push(
        <Button key="export" size="small" onClick={onExport} icon={<ExportOutlined />} color="default">
          {t('components:ListingTable.export')}
        </Button>,
      );
    }
    if (deletable && onDelete) {
      cloneActions.push(
        <Button key="delete" size="small" onClick={onDelete} icon={<DeleteOutlined />} color="error">
          {t('components:ListingTable.delete')}
        </Button>,
      );
    }
    if (onClear) {
      cloneActions.push(<Button key="clear" size="small" onClick={onClear} icon={<CloseOutlined />} color="default" />);
    }
    return cloneActions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Actions, isShorten]);

  const handleResize = useCallback(() => {
    if (containerRef.current && containerSize) {
      const screenWidth = window.innerWidth;
      setIsShorten(screenWidth < containerSize + 128);
    }
  }, [containerSize]);
  useResizeEvent(handleResize, [handleResize]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      className="flex items-center gap-8"
      ref={containerRef}
      style={{
        flexDirection: !Actions.length && isMobile ? 'column' : undefined,
        gap: !Actions.length && isMobile ? 4 : undefined,
      }}
    >
      <div className="flex grow items-center justify-between">
        <div className="text-nowrap font-medium">
          {t('components:ListingTable.quantity_records_selected', {
            selected: totalSelectedRecords,
            total: totalRecords,
          })}
        </div>
      </div>
      <div className="flex items-center gap-1">{mergedActions}</div>
    </div>
  );
};
