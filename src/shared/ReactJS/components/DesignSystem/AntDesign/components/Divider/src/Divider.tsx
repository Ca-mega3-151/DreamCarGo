import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<AntDividerProps, 'className' | 'orientation' | 'orientationMargin' | 'dashed' | 'type' | 'children'> {}

/**
 * Divider component extends the functionality of the Ant Design Divider component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Divider component.
 *
 * @param {Props} props - The properties for the Divider component.
 * @param {ReactNode} [props.children] - Content to be displayed inside the divider.
 * @param {string} [props.type] - The type of divider, could be 'horizontal' or 'vertical'.
 * @param {string} [props.className] - Custom CSS class for styling the divider.
 * @param {string} [props.orientation] - The position of the text inside the divider, could be 'left', 'right', or 'center'.
 * @param {string | number} [props.orientationMargin] - The margin of the text inside the divider.
 * @param {boolean} [props.dashed=false] - Whether the divider is dashed.
 * @returns {ReactNode} The rendered Divider component.
 */
export const Divider: FC<Props> = ({ children, type, className, orientation, orientationMargin, dashed = false }) => {
  useInitializeContext();

  return (
    <AntDivider
      plain
      children={children}
      type={type}
      dashed={dashed}
      orientation={orientation}
      orientationMargin={orientationMargin}
      className={classNames('AntDivider__container', className)}
    />
  );
};
