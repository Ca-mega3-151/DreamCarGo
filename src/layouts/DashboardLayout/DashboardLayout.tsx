import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Logo } from './components/Logo';
import { Notification } from './components/Notification/Notification';
import { UserDropdown } from './components/UserDropdown/UserDropdown';
import { useGetNavData } from './hooks/useGetNavData';
import { useIsMobile } from '~/hooks/useIsMobile';
import {
  Button,
  Drawer,
  LayoutContainer,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  MenuVertical,
} from '~/shared/ReactJS';
import './styles.css';

interface Props {}

export const DashboardLayout = (_: Props) => {
  const { items, openKeys, setOpenKeys, selectedKey } = useGetNavData();

  const location = useLocation();

  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleCollapseMenu = () => {
    if (isMobile) {
      setIsOpenDrawer(state => {
        return !state;
      });
    } else {
      setCollapsed(!collapsed);
    }
  };

  useEffect(() => {
    setIsOpenDrawer(false);
  }, [location]);

  return (
    <>
      <LayoutContainer>
        {!isMobile && (
          <LayoutSider width={240} collapsed={collapsed} className="Dashboard__sidebar">
            <MenuVertical
              inlineIndent={12}
              openKeys={openKeys}
              onOpenChange={value => {
                return setOpenKeys(value ?? []);
              }}
              selectedKey={selectedKey}
              Header={<Logo collapsed={collapsed} />}
              items={items}
            />
          </LayoutSider>
        )}
        <LayoutContainer className="Dashboard__content">
          <LayoutHeader className="Dashboard__header">
            <div className="Dashboard__headerContent">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleCollapseMenu}
              />
              <div className="Dashboard__headerRight">
                <Notification />
                <UserDropdown />
              </div>
            </div>
          </LayoutHeader>
          <LayoutContent>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </LayoutContent>
        </LayoutContainer>
      </LayoutContainer>
      <Drawer
        width={900}
        className="Menu__DrawerContainer"
        placement="left"
        open={isOpenDrawer}
        onClose={() => {
          return setIsOpenDrawer(false);
        }}
      >
        <MenuVertical
          inlineIndent={12}
          openKeys={openKeys}
          onOpenChange={value => {
            return setOpenKeys(value ?? []);
          }}
          selectedKey={selectedKey}
          items={items}
        />
      </Drawer>
    </>
  );
};
