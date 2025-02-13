# Overview

The `Radio` component extends the functionality of the Ant Design Radio component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Radio component.

# Props

| Prop         | Type                                                                               | Default              | Description                                                  |
| ------------ | ---------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------ |
| className    | `string`                                                                           | -                    | Custom CSS class for styling the radio group.                |
| disabled     | `boolean`                                                                          | -                    | Whether the radio group is disabled.                         |
| value        | `Value`                                                                            | -                    | The currently selected value.                                |
| onChange     | `(value: Value \| undefined) => void`                                              | -                    | Callback function triggered when the selected value changes. |
| items        | `Array<{ label: ReactNode; value: Value; disabled?: boolean; hidden?: boolean; }>` | -                    | The list of radio items.                                     |
| readOnly     | `boolean`                                                                          | `false`              | Whether the radio is read-only.                              |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'`                                       | `'controlled-state'` | Determines if the radio is controlled or uncontrolled state. |
| optionType   | `RadioGroupOptionType`                                                             | -                    | The option type of the radio group.                          |
| size         | `string`                                                                           | -                    | The size of radio (Only work with "optionType" is button).   |

# Usage

```jsx
import React, { useState } from 'react';
import { Radio } from './path/to/your/RadioComponent';

const Example = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const handleChange = (value: string | undefined) => {
    setSelectedValue(value);
  };

  const items = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C', disabled: true },
  ];

  return (
    <Radio
      value={selectedValue}
      onChange={handleChange}
      items={items}
      optionType="button"
    />
  );
};

export default Example;
```
