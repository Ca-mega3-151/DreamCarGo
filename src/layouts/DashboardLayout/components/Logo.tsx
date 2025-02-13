import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: Props) => {
  return (
    <Link to="/dashboard">
      <img
        src={collapsed ? '/images/logo-square.png' : '/images/logo-horizontal.png'}
        alt="Logo"
        className={classNames('inline-block my-3', collapsed ? '!w-full' : 'max-w-full')}
      />
    </Link>
  );
};
