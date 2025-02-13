# Overview

The `AutoComplete` component extends the functionality of the Ant Design AutoComplete component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design AutoComplete component.

# Props

| Prop                    | Type                                                                               | Default              | Description                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------- |
| allowClear              | `boolean`                                                                          | `true`               | Whether to show a clear button allowing the user to clear the input.                   |
| disabled                | `boolean`                                                                          | -                    | Whether the AutoComplete component is disabled.                                        |
| placeholder             | `string`                                                                           | -                    | Placeholder text to display when the input is empty.                                   |
| className               | `string`                                                                           | -                    | Custom CSS class for styling the component.                                            |
| notFoundContent         | `ReactNode`                                                                        | -                    | Content to display when no options match the input.                                    |
| loading                 | `boolean`                                                                          | `false`              | Whether the component is in a loading state, showing a loading indicator.              |
| value                   | `ValueType`                                                                        | -                    | The current value of the input.                                                        |
| onChange                | `(value: ValueType \| undefined, option?: Option<ValueType, RawData>) => void`     | -                    | Callback function that is triggered when the input value changes.                      |
| filterOption            | `boolean \| ((inputValue: string, option: Option<ValueType, RawData>) => boolean)` | `baseFilterOption`   | Custom filter function to determine whether an option should be shown in the dropdown. |
| options                 | `Option<ValueType, RawData>[]`                                                     | `[]`                 | Array of options to be displayed in the dropdown menu.                                 |
| searchValue             | `string`                                                                           | -                    | The value of the search input.                                                         |
| open                    | `boolean`                                                                          | -                    | Whether the dropdown menu is open.                                                     |
| onDropdownVisibleChange | `Function`                                                                         | -                    | Callback function that is triggered when the dropdown visibility changes.              |
| onSearch                | `Function`                                                                         | -                    | Callback function that is triggered when the search input value changes.               |
| readOnly                | `boolean`                                                                          | `false`              | If true, the auto-complete is read-only and cannot be changed by the user.             |
| valueVariant            | `'controlled-state' \| 'uncontrolled-state'`                                       | `'controlled-state'` | Determines if the auto-complete is controlled or uncontrolled state.                   |
| size                    | `string`                                                                           | -                    | The size of the search input.                                                          |
| footer                  | `ReactNode`                                                                        | `true`               | The footer to be displayed at the bottom of the auto-complete's dropdown.              |

# Usage

```jsx
import { AutoComplete } from "path-to-AutoComplete";

// Example usage
<AutoComplete allowClear disabled={false} placeholder="Search..." className="custom-class" notFoundContent="No matches found" loading={true} value={inputValue} onChange={handleInputChange} filterOption={(inputValue, option) => option.value.includes(inputValue)} options={optionsList} searchValue={searchValue} open={isDropdownOpen} onDropdownVisibleChange={handleDropdownVisibleChange} onSearch={handleSearch} size={size} />;
```
