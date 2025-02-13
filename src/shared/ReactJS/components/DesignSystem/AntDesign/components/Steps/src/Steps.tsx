import { Steps as AntSteps, StepsProps as AntStepsProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props
  extends Pick<AntStepsProps, 'className' | 'current' | 'onChange' | 'type' | 'labelPlacement' | 'size'> {
  /** Array of step items */
  items?: Array<{
    /** Description of the step. */
    description?: ReactNode;
    /** Whether the step is disabled. */
    disabled?: boolean;
    /** Icon of the step. */
    icon?: ReactNode;
    /** Subtitle of the step. */
    subTitle?: ReactNode;
    /** Title of the step. */
    title: ReactNode;
    /** Status of the step. */
    status?: 'wait' | 'process' | 'finish' | 'error';
  }>;
  /** Type of the steps component. */
  type?: 'default' | 'navigation';
  /** Percentage of the current step progress. */
  currentPercent?: number;
}

/**
 * Steps component extends the functionality of the Ant Design Steps component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Steps component.
 *
 * @param {Object} props - The properties for the Steps component.
 * @param {string} [props.className] - Custom CSS class for styling the steps component.
 * @param {number} [props.current] - Index of the current step.
 * @param {function} [props.onChange] - Callback function triggered when the current step changes.
 * @param {'default' | 'navigation'} [props.type] - Type of the steps component. Default is 'default'.
 * @param {'horizontal' | 'vertical'} [props.labelPlacement] - Position of the step label. Default is 'horizontal'.
 * @param {number} [props.currentPercent] - Percentage of the current step progress.
 * @param {'default' | 'small'} [props.size] - Size of the steps component. Default is 'default'.
 * @param {Array<Object>} [props.items] - Array of step items with the following properties:
 * @param {ReactNode} [props.items.description] - Description of the step.
 * @param {boolean} [props.items.disabled] - Whether the step is disabled.
 * @param {ReactNode} [props.items.icon] - Icon of the step.
 * @param {ReactNode} [props.items.subTitle] - Subtitle of the step.
 * @param {ReactNode} props.items.title - Title of the step.
 * @param {'wait' | 'process' | 'finish' | 'error'} [props.items.status] - Status of the step.
 * @returns {ReactNode} The rendered Steps component.
 */
export const Steps: FC<Props> = ({
  className,
  items = [],
  current,
  onChange,
  type = 'default',
  labelPlacement,
  currentPercent,
  size = 'default',
}) => {
  useInitializeContext();

  return (
    <AntSteps
      className={classNames('AntSteps__container', className)}
      items={items}
      current={current}
      onChange={onChange}
      type={type}
      labelPlacement={labelPlacement}
      percent={currentPercent}
      size={size}
    />
  );
};
