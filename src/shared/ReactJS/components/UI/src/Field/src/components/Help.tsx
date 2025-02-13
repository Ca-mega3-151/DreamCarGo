import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';

interface Props extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'> {
  help?: ReactNode;
}
/**
 * FieldHelp component to display help messages for form fields.
 * @param {object} props - Props for the FieldHelp component.
 * @param {ReactNode} props.help - Help message to be displayed.
 * @param {string} [props.className] - Additional CSS class names for styling.
 * @param {object} [props...rest] - Additional HTML attributes to be spread onto the div element.
 * @returns {JSX.Element} - The rendered FieldHelp component.
 */
export const Help: FC<Props> = ({ help, className, ...props }) => {
  return (
    <div {...props} className={classNames('Field__help', className)}>
      {help}
    </div>
  );
};
