import classNames from 'classnames';
import { createElement, FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { Error } from './components/Error';
import { Help } from './components/Help';
import './styles.css';
import { FieldError } from './types/FieldError';
import { isReactHookFormFieldError } from './utils/isReactHookFormFieldError';
import { isReactNode } from './utils/isReactNode';

export interface Props {
  /** The label for the input field */
  label: ReactNode;
  /** The children components */
  children: ReactNode;
  /** Error message to display if input validation fails */
  error?: ReactNode | FieldError;
  /** Help message to provide additional information */
  help?: ReactNode;
  /** If true, indicates that the field is required */
  withRequiredMark?: boolean;
  /** HTML tag name for the field wrapper */
  tagName?: keyof HTMLElementTagNameMap;
  /** Additional CSS class for styling */
  className?: string;
  /** CSS class for the field wrapper */
  fieldWrapperClassName?: string;
  /** CSS class for the label wrapper */
  labelWrapperClassName?: string;
  /** Specifies the id of the form element the label should be bound to. */
  htmlFor?: string;
  /** If true, the input field will automatically gain focus when the component mounts. */
  autoFocusOnMount?: boolean;
}

let isScrolling = false;
let timeoutScrolling: number | NodeJS.Timeout | undefined;
let displayStatusOnInput = true;
/**
 * Field component to render form field with label, children, and optional error message.
 * @param {object} props - Props for the Field component.
 * @param {ReactNode} props.label - The label for the input field.
 * @param {ReactNode} props.children - The child components to be rendered within the field.
 * @param {ReactNode} [props.error] - Error message to be displayed if input validation fails.
 * @param {ReactNode} [props.help] - Help message to provide additional information.
 * @param {boolean} [props.withRequiredMark] - If true, indicates that the field is required.
 * @param {keyof HTMLElementTagNameMap} [props.tagName=label] - HTML tag name for the field wrapper.
 * @param {string} [props.className] - Additional CSS class names for styling the field container.
 * @param {string} [props.fieldWrapperClassName] - CSS class for the field wrapper.
 * @param {string} [props.labelWrapperClassName] - CSS class for the label wrapper.
 * @param {string} [props.htmlFor] - Specifies the id of the form element the label should be bound to.
 * @param {boolean} [props.autoFocusOnMount] - If true, the input field will automatically gain focus when the component mounts.
 * @returns {JSX.Element} - The rendered Field component.
 */
const FieldComponent: FC<Props> = ({
  label,
  children,
  error,
  help,
  withRequiredMark,
  tagName = 'label',
  className,
  fieldWrapperClassName,
  labelWrapperClassName,
  htmlFor,
  autoFocusOnMount,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const labelTextRef = useRef<HTMLSpanElement | null>(null);

  const renderRequiredMark: FC = () => {
    if (withRequiredMark) {
      return <span className="Field__required-mark">*</span>;
    }
    return null;
  };

  //#region Handle scroll & focus to first error of form
  const getInputEl = (): HTMLElement | null | undefined => {
    if (!htmlFor) {
      return;
    }
    return containerRef.current?.querySelector(`#${htmlFor}`);
  };

  const handleScrollFirstErrorIntoView = (): void => {
    labelTextRef.current?.scrollIntoView({ inline: 'start', block: 'start', behavior: 'smooth' });
    isScrolling = true;
    timeoutScrolling = setTimeout(() => {
      isScrolling = false;
    }, 200);
  };

  const handleFocus = (): void => {
    if (containerRef.current instanceof HTMLLabelElement) {
      containerRef.current?.focus({ preventScroll: true });
      return;
    }
    const $inputEl = getInputEl();
    $inputEl?.focus();
  };

  const message = useMemo(() => {
    const node = isReactHookFormFieldError(error) ? error.message : error;
    if (isReactNode(node)) {
      return node;
    }
    return null;
  }, [error]);

  useEffect(() => {
    if (!isScrolling && isReactHookFormFieldError(error)) {
      handleScrollFirstErrorIntoView();
      handleFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    return () => {
      if (isScrolling) {
        isScrolling = false;
        clearTimeout(timeoutScrolling);
      }
    };
  }, []);
  //#endregion

  useEffect(() => {
    if (autoFocusOnMount) {
      handleScrollFirstErrorIntoView();
      handleFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createElement(
    tagName,
    {
      ref: containerRef,
      className: classNames('Field__container', message && displayStatusOnInput ? 'Field__withError' : '', className),
      onClick: handleFocus,
    },
    <>
      <div className={classNames(labelWrapperClassName)}>
        <span ref={labelTextRef} className={classNames('Field__label')}>
          {label}
        </span>
        {renderRequiredMark({})}
      </div>
      <div className={classNames(fieldWrapperClassName)}>{children}</div>
      {!!help && <Help help={help} />}
      {!!error && <Error error={message} />}
    </>,
  );
};

// @ts-ignore
export const Field: FC<Props> & {
  Help: typeof Help;
  Error: typeof Error;
  setDisplayStatusOnInput: (enable: boolean) => void;
} = FieldComponent;
Field.Help = Help;
Field.Error = Error;

Field.setDisplayStatusOnInput = (enable: boolean): void => {
  displayStatusOnInput = enable;
};
