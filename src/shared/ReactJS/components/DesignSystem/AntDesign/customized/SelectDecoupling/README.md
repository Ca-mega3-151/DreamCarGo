# Overview

The `SelectSingleDecoupling` and `SelectMultipleDecoupling` components are decoupled versions of the Select components, providing a more flexible approach for working with select inputs. They separate the data fetching and option transformation functions, allowing for better customization and reusability.

# Props

| Prop                  | Type                                                                                       | Default | Description                                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service`             | `() => Promise<Model[] \| Model[]`                                                         | -       | A function to fetch data from a service.                                                                                                                                                                                                            |
| `transformToOption`   | `(model: Model, index?: number) => SelectOption<ModelId, Model>`                           | -       | A function that transforms a model object into a selectable option. It may return `undefined` if the model does not meet the criteria for selection.                                                                                                |
| `onChange`            | `(value: ModelId \| undefined, option: SelectOption<ModelId, Model> \| undefined) => void` | -       | Callback function triggered when the selected value changes.                                                                                                                                                                                        |
| `depsFetch`           | `DependencyList`                                                                           | -       | An array of dependencies to watch for fetching data.                                                                                                                                                                                                |
| `depsTransformOption` | `DependencyList`                                                                           | -       | An array of dependencies to watch for transforming options.                                                                                                                                                                                         |
| `defaultModels`       | `Model[]`                                                                                  | -       | Used to display options while fetching models.                                                                                                                                                                                                      |
| `additionalModels`    | `Model[]`                                                                                  | -       | Used to display additional options. For example, if a model is deleted in the database and the fetch fails to retrieve it from the API, it will not be displayed correctly.                                                                         |
| `onPrepareDone`       | `(params: OnPrepareDoneParameters) => void`                                                | -       | Callback function triggered when the preparation is done. This function can be used to handle warnings if the value passed to this component is not found in the response of the service.                                                           |
| `warningText`         | `(value: ModelId) => string`                                                               | -       | A text message to display when there is a warning, such as when the `value` passed to the component is not found in the response from the `service`. This can be a static message or a function that returns a message based on the `value` passed. |
| `initializingText`    | `(value: ModelId \| undefined) => string`                                                  | -       | A function to provide a custom initializing message. This function takes the current `value` and returns a string that represents the initializing state.                                                                                           |
| `autoRefetchOnOpen`   | `boolean`                                                                                  | -       | Automatically refetch data on dropdown open.                                                                                                                                                                                                        |
| `searchType`          | `'client' \| 'api'`                                                                        | -       | Determines if searching is done locally or via API.                                                                                                                                                                                                 |
| `debounceTime`        | `number`                                                                                   | -       | Debounce delay (ms) for API-based searches.                                                                                                                                                                                                         |
| `...restProps`        | -                                                                                          | -       | All other props passed to the component will be passed down to the underlying Select component.                                                                                                                                                     |

## Usage

```jsx
import React, { useState } from 'react';
import { SelectSingleDecoupling, SelectMultipleDecoupling } from 'path-to-SelectDecoupling-components'; // Replace 'path-to-SelectDecoupling-components' with the actual path to your components

function MySelect() {
  const [selectedValue, setSelectedValue] = useState<ModelId | undefined>(undefined);
  const [data, setData] = useState<Model[]>([]); // Your data array

  const fetchData = async () => {
    // Fetch data from a service
    const newData = await yourServiceFunction();
    setData(newData);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const transformToOption = (model: Model) => {
    // Transform model data to options
    return {
      value: model.id,
      label: model.name,
    };
  };

  const handleChange = (value: ModelId | undefined, option: SelectOption<ModelId, Model> | undefined) => {
    // Handle selected value change
    setSelectedValue(value);
    console.log('Selected value:', value);
  };

  return (
    <>
      <SelectSingleDecoupling
        service={fetchData}
        transformToOption={transformToOption}
        onChange={handleChange}
        value={selectedValue}
        options={data}
        placeholder="Select a single option"
      />
      <SelectMultipleDecoupling
        service={fetchData}
        transformToOption={transformToOption}
        onChange={handleChange}
        value={selectedValue}
        options={data}
        placeholder="Select multiple options"
      />
    </>
  );
}

export default MySelect;
```
