# Overview

The `AutoCompleteDecoupling` component is a versatile input field with dropdown suggestions based on user input. This component decouples data fetching and transformation, allowing you to customize how data is retrieved and displayed as options in the dropdown menu. It supports various configurations and customization options to fit your needs.

# Props

| Prop                  | Type                                                                                             | Default     | Description                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------- |
| `service`             | `(searchValue: string) => Promise<Model[]> \| Model[]`                                           | -           | Function to fetch or transform data based on the search value.             |
| `transformToOption`   | `(model: Model, index?: number) => AutoCompleteOption<ModelId, Model>`                           | -           | Function to transform a model object into an option for the dropdown menu. |
| `onChange`            | `(value: ModelId \| undefined, option: AutoCompleteOption<ModelId, Model> \| undefined) => void` | -           | Callback function that is triggered when the input value changes.          |
| `variant`             | `'default' \| 'select'`                                                                          | `'default'` | Variant of the component, can be 'default' or 'select'.                    |
| `depsFetch`           | `DependencyList`                                                                                 | -           | An array of dependencies to watch for fetching data.                       |
| `depsTransformOption` | `DependencyList`                                                                                 | -           | An array of dependencies to watch for transforming options.                |
| `loading`             | `boolean`                                                                                        | `false`     | Whether the component is in a loading state, showing a loading indicator.  |
| `value`               | `ModelId \| undefined`                                                                           | -           | The current value of the input.                                            |
| `allowClear`          | `boolean`                                                                                        | `true`      | Whether to show a clear button allowing the user to clear the input.       |
| `className`           | `string`                                                                                         | -           | Custom CSS class for styling the component.                                |
| `disabled`            | `boolean`                                                                                        | -           | Whether the AutoComplete component is disabled.                            |
| `notFoundContent`     | `ReactNode`                                                                                      | -           | Content to display when no options match the input.                        |
| `placeholder`         | `string`                                                                                         | -           | Placeholder text to display when the input is empty.                       |

# Usage

```jsx
import { AutoCompleteDecoupling } from "path-to-AutoCompleteDecoupling";

// Example model and option type definitions
type MyModel = {
  id: number;
  name: string;
};

type MyValue = string;

// Example service function
const fetchData = async (searchValue: string): Promise<MyModel[]> => {
  // Implement your data fetching logic here
  return [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' }
  ];
};

// Example transform function
const transformToOption = (model: MyModel): AutoCompleteOption<ModelId, MyModel> => ({
  value: model.name,
  label: model.name,
  rawData: model
});

// Example usage
<AutoCompleteDecoupling
  service={fetchData}
  transformToOption={transformToOption}
  onChange={(value, option) => console.log(value, option)}
  loading={false}
  value={inputValue}
  allowClear
  className="custom-class"
  disabled={false}
  notFoundContent="No matches found"
  placeholder="Search..."
  variant="default"
  depsFetch={[dependency1, dependency2]}
  depsTransformOption={[dependency3, dependency4]}
/>;
```
