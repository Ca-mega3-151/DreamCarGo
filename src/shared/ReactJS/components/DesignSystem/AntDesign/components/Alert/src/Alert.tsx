import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import './styles.css';
import { useInitializeContext } from '../../../base';
import { colors } from './constants/colors';
import { variants } from './constants/variants';
import { Color } from './types/Color';
import { Variant } from './types/Variant';

export interface Props extends Pick<AntAlertProps, 'className' | 'action'> {
  /** Custom color for the alert. */
  color?: Color;
  /** Variant style of the alert. */
  variant?: Variant;
  /** Main message content of the alert. */
  message: ReactNode;
  /** Additional description content of the alert. */
  description: ReactNode;
  /** Custom icon for the alert. */
  icon?: ReactNode;
}

/**
 * Alert component that extends the functionality of the Ant Design Alert component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Alert component.
 *
 * @param {Props} props - The properties for the Alert component.
 * @param {string} [props.className] - Custom CSS class for styling the alert.
 * @param {Color} [props.color='primary'] - Custom color for the alert.
 * @param {Variant} [props.variant='bold'] - Variant style of the alert.
 * @param {ReactNode} props.message - Main message content of the alert.
 * @param {ReactNode} props.description - Additional description content of the alert.
 * @param {ReactNode} [props.icon] - Custom icon for the alert.
 * @param {ReactNode} [props.action] - The action of Alert.
 * @returns {ReactNode} The rendered Alert component.
 */
export const Alert: FC<Props> = ({
  className,
  color = 'primary',
  variant = 'bold',
  message,
  description,
  icon,
  action,
}) => {
  useInitializeContext();

  return (
    <AntAlert
      className={classNames('AntAlert__container', colors[color], variants[variant], className)}
      icon={icon}
      action={action}
      message={message}
      description={description}
      type={color === 'primary' ? undefined : color}
      showIcon
    />
  );
};
