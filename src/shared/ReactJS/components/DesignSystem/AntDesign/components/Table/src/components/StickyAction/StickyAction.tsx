import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import './styles.css';

interface Props extends PropsWithChildren {
  isVisible: boolean;
}

export const StickyAction: FC<Props> = ({ children, isVisible }) => {
  return (
    <div className={classNames('AntTableStickyAction__container', isVisible ? 'AntTableStickyAction__visible' : '')}>
      {children}
    </div>
  );
};
