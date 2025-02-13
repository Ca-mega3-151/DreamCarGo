# Overview

The `CheckboxGroup` component renders a group of checkbox items, allowing for customizable options and supporting strict type safety. This component is useful for creating a list of checkboxes with additional features such as disabling or hiding specific items, and providing callbacks when the state changes.

# Props

| Prop        | Type                                                                                                  | Description                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `value`     | `Value[]`                                                                                             | The currently selected values.                                              |
| `onChange`  | `(value: undefined \| Value[], target: { option: Option<Value, RawData>; checked: boolean }) => void` | Callback function triggered when the selected value changes.                |
| `items`     | `Option<Value, RawData>[]`                                                                            | The list of checkbox items.                                                 |
| `className` | `string`                                                                                              | The class name to be applied to the checkbox group container.               |
| `disabled`  | `boolean`                                                                                             | Whether the checkbox group is disabled.                                     |
| `readOnly`  | `boolean`                                                                                             | If true, the checkbox group is read-only and cannot be changed by the user. |

# Option Interface

The `Option` interface defines the structure of each checkbox item in the `items` array.

| Prop        | Type        | Description                                        |
| ----------- | ----------- | -------------------------------------------------- |
| `label`     | `ReactNode` | The label of the checkbox item.                    |
| `value`     | `Value`     | The value of the checkbox item.                    |
| `disabled`  | `boolean`   | Whether the checkbox item is disabled.             |
| `readOnly`  | `boolean`   | Whether the checkbox item is read-only.            |
| `hidden`    | `boolean`   | Whether the checkbox item is hidden.               |
| `className` | `string`    | The class name to be applied to the checkbox item. |
| `rawData`   | `RawData`   | The raw data associated with the option.           |

# Usage Example

```tsx
import React, { useState } from "react";
import { CheckboxGroup, Option } from "./CheckboxGroup";

const options: Option<string, any>[] = [
  { label: "Option 1", value: "option1", rawData: {} },
  { label: "Option 2", value: "option2", rawData: {}, disabled: true },
  { label: "Option 3", value: "option3", rawData: {}, hidden: true },
];

const App = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: undefined | string[], target: { option: Option<string, any>; checked: boolean }) => {
    setSelectedValues(value || []);
    console.log(`Option ${target.option.value} is now ${target.checked ? "checked" : "unchecked"}`);
  };

  return <CheckboxGroup items={options} value={selectedValues} onChange={handleChange} className="custom-checkbox-group" />;
};

export default App;
```
