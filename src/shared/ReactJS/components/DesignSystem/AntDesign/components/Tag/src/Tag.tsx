import { Tag as AntTag, TagProps as AntTagProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props extends Pick<AntTagProps, 'children' | 'className' | 'color' | 'bordered' | 'icon'> {}

/**
 * Tag component extends the functionality of the Ant Design Tag component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tag component.
 *
 * @param {Props} props - The properties for the Tag component.
 * @param {ReactNode} [props.children] - The content of the tag.
 * @param {string} [props.className] - Custom CSS class for styling the tag.
 * @param {string} [props.color] - Color of the tag.
 * @param {boolean} [props.bordered=true] - Whether the tag has a border.
 * @param {ReactNode} [props.icon] - Icon to be displayed in the tag.
 * @returns {ReactNode} The rendered Tag component.
 */
export const Tag: FC<Props> = ({ bordered = true, children, className, color, icon }) => {
  useInitializeContext();

  return (
    <AntTag
      bordered={bordered}
      children={children}
      className={classNames('AntTag__container', className)}
      color={color}
      icon={icon}
    />
  );
};
