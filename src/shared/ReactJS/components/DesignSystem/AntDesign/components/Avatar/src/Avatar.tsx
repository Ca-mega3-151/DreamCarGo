import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { useInitializeContext } from '../../../base';
import { Badge, BadgeProps } from '../../Badge';

export interface Props extends Pick<AntAvatarProps, 'className' | 'size' | 'shape' | 'icon' | 'srcSet' | 'children'> {
  /** The source of the avatar image. */
  src?: string;
  /** The badge to be displayed on the avatar, typically for status indicators like notifications or online presence. */
  badge?: ReactNode;
  /** Additional properties for customizing the badge component. */
  badgeProps?: Omit<BadgeProps, 'content'>;
}

/**
 * Avatar component that extends the Ant Design Avatar component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Avatar component.
 *
 * @param {Props} props - The properties for the Avatar component.
 * @param {string} [props.className] - Custom CSS class for styling the avatar.
 * @param {ReactNode} [props.icon] - The icon to be displayed inside the avatar.
 * @param {string} [props.shape] - The shape of the avatar.
 * @param {number|string} [props.size] - The size of the avatar.
 * @param {string} [props.src] - The source of the avatar image.
 * @param {string} [props.srcSet] - The source set for the avatar image.
 * @param {ReactNode} [props.children] - The ReactNode to be displayed inside the avatar (`icon` > `children`).
 * @param {ReactNode} [props.badge] - The badge to be displayed on the avatar, typically for status indicators like notifications or online presence.
 * @param {Omit<BadgeProps, 'content'>} [props.badgeProps] - Additional properties for customizing the badge component.
 * @returns {ReactNode} The rendered Avatar component.
 */
export const Avatar: FC<Props> = ({ className, icon, shape, size, src, srcSet, children, badge, badgeProps }) => {
  useInitializeContext();

  if (badge !== undefined) {
    return (
      <Badge content={badge} {...badgeProps}>
        <AntAvatar
          children={children}
          className={classNames('AntAvatar__container', className)}
          icon={icon}
          shape={shape}
          size={size}
          src={src}
          srcSet={srcSet}
        />
      </Badge>
    );
  }

  return (
    <AntAvatar
      children={children}
      className={classNames('AntAvatar__container', className)}
      icon={icon}
      shape={shape}
      size={size}
      src={src}
      srcSet={srcSet}
    />
  );
};
