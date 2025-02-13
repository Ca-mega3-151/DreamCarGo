import { FloatButton as AntFloatButton, FloatButtonProps as AntFloatButtonProps } from 'antd';
import classNames from 'classnames';
import { FC, Key, ReactNode } from 'react';
import './styles.css';
import { useInitializeContext } from '../../../base';

export interface Props extends Pick<AntFloatButtonProps, 'onClick' | 'shape' | 'className'> {
  /**
   * Array of items for the float button group. Each item includes a key, children, and optional onClick and className properties.
   * @type {Array<{ key: Key; children: ReactNode } & Pick<AntFloatButtonProps, 'onClick' | 'className'>>}
   */
  items?: Array<{ key: Key; children: ReactNode } & Pick<AntFloatButtonProps, 'onClick' | 'className'>>;
  /**
   * Custom close icon for the float button group.
   * @type {ReactNode}
   */
  closeIcon?: ReactNode;
  /**
   * Children to be rendered inside the main float button.
   * @type {ReactNode}
   */
  children: ReactNode;
}

/**
 * FloatButton component extends the functionality of the Ant Design FloatButton component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design FloatButton component.
 *
 * @param {Props} props - The properties for the FloatButton component.
 * @param {function} [props.onClick] - The click handler for the main float button.
 * @param {string} [props.shape] - The shape of the float button (e.g., 'circle', 'square').
 * @param {ReactNode} props.children - The content to be rendered inside the main float button.
 * @param {Array<{ key: Key; children: ReactNode } & Pick<AntFloatButtonProps, 'onClick' | 'className'>>} [props.items] - The items to be displayed in the float button group.
 * @param {ReactNode} [props.closeIcon] - The custom close icon for the float button group.
 * @param {string} [props.className] - Custom CSS class for styling the float button container.
 * @returns {ReactNode} The rendered FloatButton component.
 */
export const FloatButton: FC<Props> = ({ onClick, shape, children, items, closeIcon, className }) => {
  useInitializeContext();

  return (
    <AntFloatButton.Group
      closeIcon={items ? closeIcon : children}
      trigger="click"
      onClick={onClick}
      shape={shape}
      icon={children}
      className={classNames('AntFloatButton__container', className)}
    >
      {items?.map(({ children, key, className, onClick }) => {
        return (
          <AntFloatButton
            key={key}
            icon={children}
            onClick={onClick}
            className={classNames('AntFloatButton__item', className)}
          />
        );
      })}
    </AntFloatButton.Group>
  );
};
