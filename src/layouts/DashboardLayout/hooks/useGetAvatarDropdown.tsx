import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from '~/overrides/@remix-run/react';
import { DropdownItem } from '~/shared/ReactJS';

export const useGetAvatarDropdown = () => {
  const { t } = useTranslation(['dashboard_layout']);

  const items: Array<Omit<DropdownItem, 'children'>> = [
    { key: '1', label: <Link to="/profile">{t('dashboard_layout:profile')}</Link>, icon: <UserOutlined /> },
    { key: '2', label: t('dashboard_layout:change_password'), icon: <LockOutlined /> },
    {
      key: '3',
      label: <Link to="/logout">{t('dashboard_layout:logout')}</Link>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];
  return items;
};
