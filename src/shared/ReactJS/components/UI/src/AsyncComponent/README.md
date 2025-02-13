# AsyncComponent

The `AsyncComponent` is a React functional component designed to handle asynchronous rendering scenarios by displaying loading indicators, error messages, empty states, or successful content based on the component's state.

## Props

| Prop      | Type                           | Default | Description                                                                                     |
| --------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| isLoading | `boolean`                      | `false` | Flag indicating whether the component is in a loading state.                                    |
| isFailure | `boolean`                      | `false` | Flag indicating whether the component encountered a failure.                                    |
| isEmpty   | `boolean`                      | `false` | Flag indicating whether the component is empty.                                                 |
| Loading   | `ReactNode \| () => ReactNode` | -       | Component or function returning a ReactNode to render when the component is in a loading state. |
| Failure   | `ReactNode \| () => ReactNode` | -       | Component or function returning a ReactNode to render when the component encounters a failure.  |
| Empty     | `ReactNode \| () => ReactNode` | -       | Component or function returning a ReactNode to render when the component is empty.              |
| Success   | `ReactNode \| () => ReactNode` | -       | Component or function returning a ReactNode to render when the component is successful.         |

## Usage

```jsx
import { AsyncComponent } from "path-to-async-component";

// Example usage
<AsyncComponent Success={<SuccessfulContent />} isLoading={false} Loading={<LoadingSpinner />} isFailure={false} Failure={<ErrorDisplay />} isEmpty={false} Empty={<EmptyState />} />;
```
