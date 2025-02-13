import { Badge as AntBadge } from 'antd';
import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import './styles.css';
import { useInitializeContext } from '../../../base';

type AntRibbonProps = ComponentProps<typeof AntBadge.Ribbon>;
export interface Props extends Pick<AntRibbonProps, 'children' | 'className' | 'color' | 'placement'> {
  content: AntRibbonProps['text'];
}

/**
 * Ribbon component extends the functionality of the Ant Design Badge Ribbon component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Badge Ribbon component.
 *
 * @param {Props} props - The properties for the Ribbon component.
 * @param {ReactNode} [props.children] - The content to be rendered inside the ribbon.
 * @param {string} [props.className] - Custom CSS class for styling the ribbon.
 * @param {string} [props.color] - The color of the ribbon.
 * @param {string} [props.placement] - The placement of the ribbon. Can be 'start' or 'end'.
 * @param {ReactNode} [props.content] - The content to be displayed on the ribbon.
 * @returns {ReactNode} The rendered Ribbon component.
 */
export const Ribbon: FC<Props> = ({ children, className, color, placement, content }) => {
  useInitializeContext();

  return (
    <AntBadge.Ribbon
      children={children}
      rootClassName={classNames('AntRibbon__container', className)}
      color={color}
      placement={placement}
      text={content}
    />
  );
};
