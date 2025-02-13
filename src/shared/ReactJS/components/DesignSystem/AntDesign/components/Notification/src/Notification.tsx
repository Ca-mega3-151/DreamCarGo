import { notification as AntNotification, NotificationArgsProps } from 'antd';
import { GlobalConfigProps } from 'antd/es/notification/interface';
import classNames from 'classnames';
import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useInitializeContext } from '../../../base';
import { variants } from './constants/variants';
import './styles.css';
import { Variant } from './types/Variant';

type StaticFn = (
  config: Pick<NotificationArgsProps, 'placement' | 'duration'> & {
    message: ReactNode;
    description?: ReactNode;
    variant?: Variant;
    icon?: ReactNode;
  },
) => void;
interface NoticeMethods {
  success: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  error: StaticFn;
  primary: StaticFn;
}

export interface Props extends Pick<GlobalConfigProps, 'duration' | 'placement'> {
  /** Variant style of the notification. */
  variant?: Variant;
}

const defaultNotification: NoticeMethods = {
  error: () => {
    return undefined;
  },
  success: () => {
    return undefined;
  },
  info: () => {
    return undefined;
  },
  warning: () => {
    return undefined;
  },
  primary: () => {
    return undefined;
  },
};

/**
 * Default notification methods that throw an error when called.
 * This is a placeholder and should be replaced with actual implementation.
 */
export let notification: NoticeMethods = defaultNotification;

/**
 * Notification component extends the functionality of the Ant Design notification component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design notification component.
 *
 * @param {Props} props - The properties for the Notification component.
 * @param {number} [props.duration] - Duration for which the notification will be displayed.
 * @param {string} [props.placement] - Placement of the notification on the screen.
 * @param {Variant} [props.variant='bold'] - Variant style of the notification.
 * @returns {ReactNode} The rendered Notification component.
 */
export const Notification: FC<Props> = ({ duration, placement, variant = 'bold' }) => {
  useInitializeContext();

  const [api, contextHolder] = AntNotification.useNotification({
    stack: false,
    duration,
    placement,
  });

  useEffect(() => {
    notification = {
      primary: (config): void => {
        api.open({
          ...config,
          type: 'info',
          duration: config.duration ?? duration,
          placement: config.placement ?? placement,
          className: classNames(
            'AntNotification__container',
            'AntNotification--primary',
            variants[config.variant ?? variant],
          ),
        });
      },
      error: (config): void => {
        api.error({
          ...config,
          duration: config.duration ?? duration,
          placement: config.placement ?? placement,
          className: classNames('AntNotification__container', variants[config.variant ?? variant]),
        });
      },
      info: (config): void => {
        api.info({
          ...config,
          duration: config.duration ?? duration,
          placement: config.placement ?? placement,
          className: classNames('AntNotification__container', variants[config.variant ?? variant]),
        });
      },
      success: (config): void => {
        api.success({
          ...config,
          duration: config.duration ?? duration,
          placement: config.placement ?? placement,
          className: classNames('AntNotification__container', variants[config.variant ?? variant]),
        });
      },
      warning: (config): void => {
        api.warning({
          ...config,
          duration: config.duration ?? duration,
          placement: config.placement ?? placement,
          className: classNames('AntNotification__container', variants[config.variant ?? variant]),
        });
      },
    };
    return () => {
      notification = defaultNotification;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, placement, variant]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Fragment>{contextHolder}</Fragment>;
};
