import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuVerticalProps } from '~/shared/ReactJS';

export const useGetNavData = () => {
  const location = useLocation();

  const items: MenuVerticalProps<string>['items'] = useMemo(() => {
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentActiveKey = location.pathname;
    const parentMenuItem = items.find(item => {
      return (
        item &&
        'children' in item &&
        item.children?.some(child => {
          return 'key' in child && child.key && currentActiveKey.startsWith(child.key.toString());
        })
      );
    });
    setOpenKeys(parentMenuItem?.key ? [parentMenuItem.key.toString()] : []);
  }, [items, location]);

  const selectedKey = useMemo(() => {
    const secondSlashIndex = location.pathname.indexOf('/', 1);
    if (secondSlashIndex !== -1) {
      return location.pathname.substring(0, secondSlashIndex);
    } else {
      return location.pathname;
    }
  }, [location]);

  return { items, openKeys, setOpenKeys, selectedKey };
};
