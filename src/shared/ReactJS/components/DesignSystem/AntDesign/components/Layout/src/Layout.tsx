import { Layout as AntLayout, LayoutProps as AntLayoutProps, SiderProps as AntSiderProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import './styles.css';
import { useInitializeContext } from '../../../base';

export interface HeaderProps extends Pick<AntLayoutProps, 'children' | 'className'> {}
/**
 * LayoutHeader component extends the functionality of the Ant Design Layout Header component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Layout Header component.
 *
 * @param {HeaderProps} props - The properties for the LayoutHeader component.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the header.
 * @param {string} [props.className] - Custom CSS class for styling the header.
 * @returns {React.ReactElement} The rendered LayoutHeader component.
 */
export const LayoutHeader: FC<HeaderProps> = ({ children, className }) => {
  useInitializeContext();

  return <AntLayout.Header children={children} className={classNames('AntLayout__header', className)} />;
};

export interface SiderProps extends Pick<AntSiderProps, 'children' | 'className' | 'width' | 'collapsed'> {}
/**
 * LayoutSider component extends the functionality of the Ant Design Layout Sider component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Layout Sider component.
 *
 * @param {SiderProps} props - The properties for the LayoutSider component.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the sider.
 * @param {string} [props.className] - Custom CSS class for styling the sider.
 * @param {string|number} [props.width] - The width of the sider.
 * @param {boolean} [props.collapsed] - Whether the sider is collapsed.
 * @returns {React.ReactElement} The rendered LayoutSider component.
 */
export const LayoutSider: FC<SiderProps> = ({ children, className, width, collapsed }) => {
  useInitializeContext();

  return (
    <AntLayout.Sider
      collapsible
      trigger={null}
      children={children}
      theme="light"
      className={classNames('AntLayout__sider', className)}
      width={width}
      collapsed={collapsed}
    />
  );
};

export interface ContentProps extends Pick<AntLayoutProps, 'children' | 'className'> {}
/**
 * LayoutContent component extends the functionality of the Ant Design Layout Content component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Layout Content component.
 *
 * @param {ContentProps} props - The properties for the LayoutContent component.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the content area.
 * @param {string} [props.className] - Custom CSS class for styling the content area.
 * @returns {React.ReactElement} The rendered LayoutContent component.
 */
export const LayoutContent: FC<ContentProps> = ({ children, className }) => {
  useInitializeContext();

  return <AntLayout.Content children={children} className={classNames('AntLayout__content', className)} />;
};

export interface ContainerProps extends Pick<AntLayoutProps, 'children' | 'className' | 'hasSider'> {}
/**
 * LayoutContainer component extends the functionality of the Ant Design Layout Container component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Layout Container component.
 *
 * @param {ContainerProps} props - The properties for the LayoutContainer component.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the container.
 * @param {string} [props.className] - Custom CSS class for styling the container.
 * @returns {React.ReactElement} The rendered LayoutContainer component.
 */
export const LayoutContainer: FC<ContainerProps> = ({ children, className }) => {
  useInitializeContext();

  return <AntLayout children={children} className={classNames('AntLayout__container', className)} />;
};
