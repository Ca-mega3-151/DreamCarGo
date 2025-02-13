import classNames from 'classnames';
import { CSSProperties, forwardRef, type HTMLAttributes } from 'react';
import './styles.css';

export type Props = HTMLAttributes<HTMLSpanElement> & {
  size?: number;
};

/**
 * Loading component representing a spinning animation.
 * @param {Props} props - Props for the Loading component.
 * @param {number} props.size - Size of loading component.
 * @param {...HTMLAttributes<HTMLSpanElement>} props.props - Other HTML attributes for the component.
 * @param {React.Ref<HTMLDivElement>} ref - Reference to the HTML div element.
 * @returns {JSX.Element} - JSX Element representing the Loading component.
 */
export const Loading = forwardRef<HTMLDivElement, Props>(({ size = 40, ...props }, ref) => {
  return (
    <span
      {...props}
      style={{ ...props.style, '--Loading-size': size + 'px' } as CSSProperties}
      ref={ref}
      className={classNames('Loading__container', props.className)}
    />
  );
});

Loading.displayName = 'Loading';
