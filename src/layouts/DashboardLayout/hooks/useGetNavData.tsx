import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from '~/overrides/@remix-run/react';
import { ListingBrandingWithHookAndModalBaseUrl } from '~/routes/Dashboard/src/BrandingWithHookAndModal/src/constants/BaseUrl';
import { ListingBrandingWithHookAndPageBaseUrl } from '~/routes/Dashboard/src/BrandingWithHookAndPage/src/constants/BaseUrl';
import { ListingBrandingWithReactRouterAndModalBaseUrl } from '~/routes/Dashboard/src/BrandingWithReactRouterAndModal/src/constants/BaseUrl';
import { ListingBrandingWithReactRouterAndPageBaseUrl } from '~/routes/Dashboard/src/BrandingWithReactRouterAndPage/src/constants/BaseUrl';
import { MenuVerticalProps } from '~/shared/ReactJS';

export const useGetNavData = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuVerticalProps<string>['items'] = useMemo(() => {
    return [
      {
        key: '/dashboard',
        icon: <HomeOutlined />,
        label: t('dashboard_layout:menu.home'),
        onClick: () => {
          return navigate('/dashboard');
        },
      },
      {
        key: ListingBrandingWithReactRouterAndModalBaseUrl,
        icon: <StarOutlined />,
        label: (
          <Link to={ListingBrandingWithReactRouterAndModalBaseUrl}>
            {t('dashboard_layout:menu.branding_with_react_router_and_modal')}
          </Link>
        ),
      },
      {
        key: ListingBrandingWithReactRouterAndPageBaseUrl,
        icon: <StarOutlined />,
        label: (
          <Link to={ListingBrandingWithReactRouterAndPageBaseUrl}>
            {t('dashboard_layout:menu.branding_with_react_router_and_page')}
          </Link>
        ),
      },
      {
        key: ListingBrandingWithHookAndModalBaseUrl,
        icon: <StarOutlined />,
        label: (
          <Link to={ListingBrandingWithHookAndModalBaseUrl}>
            {t('dashboard_layout:menu.branding_with_hook_and_modal')}
          </Link>
        ),
      },
      {
        key: ListingBrandingWithHookAndPageBaseUrl,
        icon: <StarOutlined />,
        label: (
          <Link to={ListingBrandingWithHookAndPageBaseUrl}>
            {t('dashboard_layout:menu.branding_with_hook_and_page')}
          </Link>
        ),
      },
      // {
      //   key: ListingBrandingWithReactRouterAndPageBaseUrl,
      //   icon: <StarOutlined />,
      //   label: (
      //     <Link to={ListingBrandingWithReactRouterAndPageBaseUrl}>
      //       {t('dashboard_layout:menu.branding_with_react_router_and_page')}
      //     </Link>
      //   ),
      // },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

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
