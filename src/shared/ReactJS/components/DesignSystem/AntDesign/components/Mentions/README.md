# Overview

The `Mentions` component extends the functionality of the Ant Design Mentions component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Mentions component.

# Props

| Prop            | Type                                                       | Default              | Description                                                    |
| --------------- | ---------------------------------------------------------- | -------------------- | -------------------------------------------------------------- |
| allowClear      | `boolean`                                                  | `true`               | Whether to allow clearing the input.                           |
| autoSize        | `false \| Exclude<AntMentionProps['autoSize'], boolean>`   | `false`              | Auto size of the input field.                                  |
| className       | `string`                                                   | -                    | Custom CSS class for styling the mentions component.           |
| disabled        | `boolean`                                                  | `false`              | Disabled state of the mentions component.                      |
| filterOption    | `(inputValue: string, option: Option<RawData>) => boolean` | `baseFilterOption`   | Custom filter function for options.                            |
| loading         | `boolean`                                                  | `false`              | Loading state of the mentions component.                       |
| maxLength       | `number`                                                   | -                    | Maximum length of the input.                                   |
| notFoundContent | `ReactNode`                                                | -                    | Content to display when no options are found.                  |
| onChange        | `(value: string \| undefined) => void`                     | -                    | Callback function that is called when the value changes.       |
| onSearch        | `(text: string) => void`                                   | -                    | Callback function that is called when the search text changes. |
| onSelect        | `(option: Option<RawData>, prefix: string) => void`        | -                    | Callback function that is called when an option is selected.   |
| options         | `Option<RawData>[]`                                        | `[]`                 | Options for mention suggestions.                               |
| placeholder     | `string`                                                   | -                    | Placeholder text for the input.                                |
| prefix          | `string`                                                   | `'@'`                | Prefix character(s) to trigger mention suggestions.            |
| readOnly        | `boolean`                                                  | `false`              | Read-only state of the mentions component.                     |
| split           | `string`                                                   | `' '`                | Character(s) to separate mention suggestions.                  |
| value           | `string`                                                   | `''`                 | The value of the input.                                        |
| valueVariant    | `'controlled-state' \| 'uncontrolled-state'`               | `'controlled-state'` | Determines if the input is controlled or uncontrolled state.   |

# Usage

```jsx
import { Mentions } from "path-to-Mentions";

// Example usage
const options = [
  { value: "user1", label: "User One" },
  { value: "user2", label: "User Two" },
];

<Mentions allowClear autoSize className="custom-class" disabled={false} filterOption={(inputValue, option) => option.label.toLowerCase().includes(inputValue.toLowerCase())} loading={false} maxLength={100} notFoundContent={<span>No user found</span>} onChange={(value) => console.log("Value changed:", value)} onSearch={(text) => console.log("Search text:", text)} onSelect={(option, prefix) => console.log("Selected option:", option, "with prefix:", prefix)} options={options} placeholder="Type @ to mention" prefix="@" readOnly={false} split=" " value="@user1" valueVariant="controlled-state" />;
```
