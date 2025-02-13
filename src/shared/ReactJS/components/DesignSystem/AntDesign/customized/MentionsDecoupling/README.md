# Overview

The `MentionsDecoupling` component provides a more flexible approach for working with Mentions components, allowing for separate data fetching and option transformation functions. This design allows for better customization and reusability of the Mentions component.

# Props

| Prop                | Type                                                      | Default | Description                                                                             |
| ------------------- | --------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `service`           | `(text: string) => Promise<Model[]> \| Model[]`           | -       | A function to fetch data from a service.                                                |
| `transformToOption` | `(model: Model, index?: number) => MentionsOption<Model>` | -       | A function to transform the fetched model data into options for the Mentions component. |
| `allowClear`        | `boolean`                                                 | -       | Whether to allow clearing the input value.                                              |
| `autoSize`          | `boolean \| Object`                                       | -       | Whether to automatically adjust the height of the input field.                          |
| `className`         | `string`                                                  | -       | The CSS class name of the input field.                                                  |
| `disabled`          | `boolean`                                                 | -       | Whether the input field is disabled.                                                    |
| `maxLength`         | `number`                                                  | -       | The maximum length of the input value.                                                  |
| `notFoundContent`   | `ReactNode`                                               | -       | Content to show when no options are found.                                              |
| `onChange`          | `(value: string) => void`                                 | -       | The callback function triggered when the input value changes.                           |
| `onSelect`          | `(option: MentionsOption<Model>, prefix: string) => void` | -       | The callback function triggered when an option is selected.                             |
| `placeholder`       | `string`                                                  | -       | The placeholder text for the input field.                                               |
| `prefix`            | `string \| string[]`                                      | -       | The prefix character(s) to trigger the mention.                                         |
| `readOnly`          | `boolean`                                                 | -       | Whether the input field is read-only.                                                   |
| `split`             | `string`                                                  | -       | The character to use for splitting the mentions.                                        |
| `value`             | `string`                                                  | -       | The input value.                                                                        |
| `valueVariant`      | `string`                                                  | -       | The variant of the value.                                                               |

## Usage

```jsx
import React, { useState, useEffect } from 'react';
import { MentionsDecoupling } from 'path-to-MentionsDecoupling-component'; // Replace 'path-to-MentionsDecoupling-component' with the actual path to your component

function MyMentions() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Model[]>([]); // Your data array

  const fetchData = async (text: string) => {
    // Fetch data from a service
    const newData = await yourServiceFunction(text);
    setData(newData);
    return newData;
  };

  const transformToOption = (model: Model) => {
    // Transform model data to options
    return {
      value: model.id,
      label: model.name,
    };
  };

  const handleChange = (value: string) => {
    // Handle input value change
    setValue(value);
    console.log('Input value:', value);
  };

  const handleSelect = (option: MentionsOption<Model>, prefix: string) => {
    // Handle option select
    console.log('Selected option:', option, 'with prefix:', prefix);
  };

  return (
    <MentionsDecoupling
      service={fetchData}
      transformToOption={transformToOption}
      onChange={handleChange}
      onSelect={handleSelect}
      value={value}
      placeholder="Mention someone"
    />
  );
}

export default MyMentions;
```
