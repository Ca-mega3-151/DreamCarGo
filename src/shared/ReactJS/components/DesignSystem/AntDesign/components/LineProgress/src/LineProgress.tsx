import { Progress as AntProgress, ProgressProps as AntProgressProps } from 'antd';
import { ProgressSize, StringGradients } from 'antd/es/progress/progress';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { useInitializeContext } from '../../../base';

export interface Props extends Pick<AntProgressProps, 'className' | 'showInfo' | 'percent' | 'percentPosition'> {
  /**
   * Size of the progress bar. Can be a predefined size or an object with custom width and height.
   * @type {ProgressSize | { width: number | string; height: number }}
   */
  size?: ProgressSize | { width: number | string; height: number };
  /**
   * Color of the progress bar stroke. Can be a string or a gradient configuration.
   * @type {string | StringGradients}
   */
  strokeColor?: string | StringGradients;
  /**
   * Custom format function for the progress percentage display.
   * @param {number | undefined} percent - The current percentage.
   * @returns {ReactNode} The formatted display of the percentage.
   */
  format?: (percent: number | undefined) => ReactNode;
}

/**
 * LineProgress component extends the functionality of the Ant Design Progress component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Progress component.
 *
 * @param {Props} props - The properties for the LineProgress component.
 * @param {string} [props.className] - Custom CSS class for styling the progress bar container.
 * @param {boolean} [props.showInfo] - Whether to display the progress percentage or status.
 * @param {number} [props.percent] - The current percentage of the progress.
 * @param {string | { width: number | string; height: number }} [props.size='default'] - The size of the progress bar.
 * @param {string} [props.percentPosition] - The position of the progress percentage.
 * @param {string | StringGradients} [props.strokeColor] - The stroke color of the progress bar.
 * @param {function} [props.format] - Custom format function for the progress percentage display.
 * @returns {ReactNode} The rendered LineProgress component.
 */
export const LineProgress: FC<Props> = ({
  className,
  showInfo,
  percent,
  size = 'default',
  percentPosition,
  strokeColor,
  format,
}) => {
  useInitializeContext();

  return (
    <AntProgress
      type="line"
      status="normal"
      className={classNames('AntLineProgress__container', className)}
      size={typeof size === 'string' ? size : [size.width, size.height]}
      percent={percent}
      showInfo={showInfo}
      percentPosition={percentPosition}
      strokeColor={strokeColor}
      format={format}
    />
  );
};
