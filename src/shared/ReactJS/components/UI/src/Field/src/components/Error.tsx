import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';

interface Props extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'> {
  error?: ReactNode;
}

/**
 * FieldError component to display error messages for form fields.
 * @param {object} props - Props for the FieldError component.
 * @param {ReactNode} props.error - Error message to be displayed.
 * @param {string} [props.className] - Additional CSS class names for styling.
 * @param {object} [props...rest] - Additional HTML attributes to be spread onto the div element.
 * @returns {JSX.Element} - The rendered FieldError component.
 */
export const Error: FC<Props> = ({ error, className, ...props }) => {
  return (
    <div {...props} className={classNames('Field__error', className)}>
      {error}
    </div>
  );
};
