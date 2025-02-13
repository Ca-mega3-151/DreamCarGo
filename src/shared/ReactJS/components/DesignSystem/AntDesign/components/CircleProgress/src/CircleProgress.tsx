import { Progress as AntProgress, ProgressProps as AntProgressProps } from 'antd';
import { ProgressSize, StringGradients } from 'antd/es/progress/progress';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { useInitializeContext } from '../../../base';

export interface Props extends Pick<AntProgressProps, 'className' | 'showInfo' | 'percent' | 'strokeWidth'> {
  /**
   * Size of the progress circle. Can be a predefined size or a custom number.
   * @type {ProgressSize | number}
   */
  size?: ProgressSize | number;
  /**
   * Color of the progress circle stroke. Can be a string or a gradient configuration.
   * @type {string | StringGradients}
   */
  strokeColor?: string | StringGradients;
  /**
   * Custom format function for the progress percentage display.
   * @param {number | undefined} percent - The current percentage.
   * @returns {ReactNode} The formatted display of the percentage.
   */
  format?: (percent: number | undefined) => ReactNode;
  /**
   * Type of the progress circle. Can be 'circle' or 'dashboard'.
   * @type {'circle' | 'dashboard'}
   */
  type?: 'circle' | 'dashboard';
}

/**
 * CircleProgress component extends the functionality of the Ant Design Progress component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Progress component.
 *
 * @param {Props} props - The properties for the CircleProgress component.
 * @param {string} [props.className] - Custom CSS class for styling the progress circle container.
 * @param {boolean} [props.showInfo] - Whether to display the progress percentage or status.
 * @param {number} [props.percent] - The current percentage of the progress.
 * @param {string | number} [props.size='default'] - The size of the progress circle.
 * @param {string | StringGradients} [props.strokeColor] - The stroke color of the progress circle.
 * @param {number} [props.strokeWidth] - The width of the progress circle stroke.
 * @param {function} [props.format] - Custom format function for the progress percentage display.
 * @param {'circle' | 'dashboard'} [props.type='circle'] - The type of the progress circle.
 * @returns {ReactNode} The rendered CircleProgress component.
 */
export const CircleProgress: FC<Props> = ({
  className,
  showInfo,
  percent,
  size = 'default',
  strokeColor,
  strokeWidth,
  format,
  type = 'circle',
}) => {
  useInitializeContext();

  return (
    <AntProgress
      type={type}
      status="normal"
      className={classNames('AntCircleProgress__container', className)}
      size={size}
      percent={percent}
      showInfo={showInfo}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      format={format}
    />
  );
};
