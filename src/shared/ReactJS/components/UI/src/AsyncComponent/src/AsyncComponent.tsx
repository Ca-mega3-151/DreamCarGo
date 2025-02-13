import { FC, ReactNode } from 'react';

export interface Props {
  /** Flag indicating whether the component is in a loading state. */
  isLoading?: boolean;

  /** Flag indicating whether the component encountered a failure. */
  isFailure?: boolean;

  /** Flag indicating whether the component is empty. */
  isEmpty?: boolean;

  /** Component or function returning a ReactNode to render when the component is in a loading state. */
  Loading?: ReactNode | (() => ReactNode);

  /** Component or function returning a ReactNode to render when the component encounters a failure. */
  Failure?: ReactNode | (() => ReactNode);

  /** Component or function returning a ReactNode to render when the component is empty. */
  Empty?: ReactNode | (() => ReactNode);

  /** Component or function returning a ReactNode to render when the component is successful. */
  Success: ReactNode | (() => ReactNode);
}

/**
 * React functional component representing an asynchronous rendering component.
 *
 * @component
 * @example
 * // <AsyncComponent
 * //   Success={<SuccessfulContent />}
 * //   isLoading={false}
 * //   Loading={<LoadingSpinner />}
 * //   isFailure={false}
 * //   Failure={<ErrorDisplay />}
 * //   isEmpty={false}
 * //   Empty={<EmptyState />}
 * // />
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.isLoading=false] - Flag indicating whether the component is in a loading state.
 * @param {boolean} [props.isFailure=false] - Flag indicating whether the component encountered a failure.
 * @param {boolean} [props.isEmpty=false] - Flag indicating whether the component is empty.
 * @param {React.ReactNode | () => React.ReactNode} [props.Loading] - Component or function returning a ReactNode to render when the component is in a loading state.
 * @param {React.ReactNode | () => React.ReactNode} [props.Failure] - Component or function returning a ReactNode to render when the component encounters a failure.
 * @param {React.ReactNode | () => React.ReactNode} [props.Empty] - Component or function returning a ReactNode to render when the component is empty.
 * @param {React.ReactNode | () => React.ReactNode} props.Success - Component or function returning a ReactNode to render when the component is successful. (Required)
 *
 * @returns {React.FC} Returns a React functional component.
 */
export const AsyncComponent: FC<Props> = ({ Success, isLoading, Loading, isFailure, Failure, isEmpty, Empty }) => {
  if (isFailure) {
    return typeof Failure === 'function' ? Failure() : Failure;
  }
  if (isLoading) {
    return typeof Loading === 'function' ? Loading() : Loading;
  }
  if (isEmpty) {
    return typeof Empty === 'function' ? Empty() : Empty;
  }
  return typeof Success === 'function' ? Success() : Success;
};
