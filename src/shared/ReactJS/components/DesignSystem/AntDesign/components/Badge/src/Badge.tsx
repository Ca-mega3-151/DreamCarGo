import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props extends Pick<AntBadgeProps, 'children' | 'className' | 'showZero' | 'offset' | 'dot' | 'size'> {
  content: AntBadgeProps['count'];
  color?: AntBadgeProps['color'] | 'primary';
}

/**
 * Badge component extends the functionality of the Ant Design Badge component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Badge component.
 *
 * @param {Props} props - The properties for the Badge component.
 * @param {ReactNode} [props.children] - The content to be rendered inside the badge.
 * @param {string} [props.className] - Custom CSS class for styling the badge.
 * @param {string} [props.color] - The color of the badge.
 * @param {ReactNode} [props.content] - Content to show in the badge.
 * @param {boolean} [props.dot] - Whether to display a dot instead of a number.
 * @param {[number, number]} [props.offset] - Set offset of the badge.
 * @param {boolean} [props.showZero] - Whether to show the badge when count is zero.
 * @param {string} [props.size] - The size of badge.
 * @returns {ReactNode} The rendered Badge component.
 */
export const Badge: FC<Props> = ({ children, className, color, content, dot, offset, showZero, size }) => {
  useInitializeContext();

  return (
    <AntBadge
      children={children}
      rootClassName={classNames('AntBadge__container', color === 'primary' ? 'AntBadge__colorPrimary' : '', className)}
      color={color === 'primary' ? undefined : color}
      count={content}
      dot={dot}
      offset={offset}
      showZero={showZero}
      size={size}
    />
  );
};
