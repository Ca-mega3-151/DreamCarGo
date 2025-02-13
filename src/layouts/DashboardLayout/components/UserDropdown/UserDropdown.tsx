import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { useUpdate } from '~/hooks/useCRUD/useUpdate';
import { useIsMobile } from '~/hooks/useIsMobile';
import { Link } from '~/overrides/@remix-run/react';
import { SessionData } from '~/packages/_Common/Auth/models/SessionData';
import {
  ProfileFormChangePassword,
  ProfileFormChangePasswordValues,
} from '~/packages/_Common/Profile/components/FormChangePassword/FormChangePassword';
import { Avatar, Drawer, Dropdown, DropdownItem } from '~/shared/ReactJS';
import './styles.css';

interface Props {
  sessionData: SessionData;
}

export const UserDropdown = ({ sessionData }: Props) => {
  const FormChangePasswordUid = useMemo(() => {
    return 'UserDropdown__FormChangePassword' + v4();
  }, []);
  const { t } = useTranslation(['dashboard_layout', 'profile', 'components', 'common']);

  const isMobile = useIsMobile();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenMenu = useCallback(() => {
    if (isMobile) {
      setIsOpenDrawer(true);
    }
  }, [isMobile]);

  //#region Change password
  const { handleOpenModalUpdate, handleCloseModalUpdate, handleUpdate, isOpenModalUpdate, isUpdating } = useUpdate<
    ProfileFormChangePasswordValues,
    {},
    {}
  >({
    getDetail: () => {
      return Promise.resolve({});
    },
    update: async values => {
      console.log('Call API', values);
      return {};
    },
  });
  //#endregion

  const avatarMenuItems: DropdownItem[] = useMemo(() => {
    return [
      {
        key: '1',
        label: <Link to="/profile">{t('dashboard_layout:profile')}</Link>,
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: t('dashboard_layout:change_password'),
        icon: <LockOutlined />,
        onClick: () => {
          return handleOpenModalUpdate({});
        },
      },
      {
        key: '3',
        label: <Link to="/logout">{t('dashboard_layout:logout')}</Link>,
        icon: <LogoutOutlined />,
        danger: true,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

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
            <Avatar src={sessionData?.profile?.avatar || '/images/avatar.png'} size={40} />
          </div>
          <div className={classNames('flex flex-col', isMobile ? '!hidden' : '')}>
            <div className="text-sm font-semibold">{sessionData?.profile?.fullName}</div>
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
            <Avatar src={sessionData?.profile?.avatar || '/images/avatar.png'} size={40} />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold">{sessionData?.profile?.fullName}</div>
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
      <ModalWithI18n
        width={700}
        open={isOpenModalUpdate !== false}
        onCancel={handleCloseModalUpdate}
        onOk={() => {
          return undefined;
        }}
        title={t('dashboard_layout:change_password')}
        okText={t('components:FormMutation.save')}
        okButtonProps={{
          htmlType: 'submit',
          form: FormChangePasswordUid,
        }}
      >
        <ProfileFormChangePassword
          isSubmitting={isUpdating}
          onSubmit={handleUpdate}
          uid={FormChangePasswordUid}
          defaultValues={{
            confirmPassword: undefined,
            newPassword: undefined,
            oldPassword: undefined,
          }}
        />
      </ModalWithI18n>
    </>
  );
};
