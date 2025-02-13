import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { useIsMobile } from '~/hooks/useIsMobile';
import { Avatar, Drawer, Dropdown, DropdownItem } from '~/shared/ReactJS';
import './styles.css';

interface Props {}

export const UserDropdown = (_: Props) => {
  const isMobile = useIsMobile();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenMenu = useCallback(() => {
    if (isMobile) {
      setIsOpenDrawer(true);
    }
  }, [isMobile]);
  const avatarMenuItems: DropdownItem[] = useMemo(() => {
    return [];
  }, []);

  return (
    <>
      <Dropdown open={isMobile ? false : undefined} items={avatarMenuItems}>
        <div
          role="button"
          tabIndex={0}
          onKeyUp={handleOpenMenu}
          onClick={handleOpenMenu}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Avatar src="/images/avatar.png" size={40} />
          </div>
          <div className={classNames('flex flex-col', isMobile ? '!hidden' : '')}>
            <div className="text-sm font-semibold">John Doe</div>
          </div>
        </div>
      </Dropdown>
      <Drawer
        width={900}
        className="User__DrawerContainer"
        open={isOpenDrawer}
        onClose={() => {
          return setIsOpenDrawer(false);
        }}
      >
        <div className="flex items-center gap-2 border border-x-0 border-t-0 border-solid border-neutral-200 p-3">
          <div className="flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Avatar src="/images/avatar.png" size={40} />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold">John Doe</div>
          </div>
        </div>
        <div>
          {avatarMenuItems.map(item => {
            if (item.hidden) {
              return null;
            }
            return (
              <div
                key={item.key}
                className="border border-x-0 border-t-0 border-solid border-neutral-100 last:border-none"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onKeyUp={item.onClick}
                  onClick={item.onClick}
                  className={classNames(
                    'flex cursor-pointer items-center gap-2 p-2 transition-all',
                    item.danger ? 'hover:bg-yy-error-bg' : 'hover:bg-neutral-100',
                  )}
                >
                  <div
                    className={classNames(
                      'flex items-center justify-center text-base',
                      item.danger ? 'text-yy-error' : '',
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className={classNames('text-sm', item.danger ? 'text-yy-error' : '')}>{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};
