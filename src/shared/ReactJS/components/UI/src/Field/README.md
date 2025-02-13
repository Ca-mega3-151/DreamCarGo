# Overview

The `Field` component renders a form field with a label, child components, and optional error and help messages. It provides flexibility in styling and functionality, making it easy to integrate into various forms.

# Props

| Prop                    | Type                                             | Description                                                                      |
| ----------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| `label`                 | `ReactNode`                                      | The label for the input field.                                                   |
| `children`              | `ReactNode`                                      | The child components to be rendered within the field.                            |
| `error`                 | `ReactNode`                                      | Error message to be displayed if input validation fails.                         |
| `help`                  | `ReactNode`                                      | Help message to provide additional information about the field.                  |
| `withRequiredMark`      | `boolean`                                        | If true, indicates that the field is required.                                   |
| `tagName`               | `'label' \| 'div' \| 'span' \| 'section' \| ...` | HTML tag name for the field wrapper. Default is `'label'`.                       |
| `className`             | `string`                                         | Additional CSS class names for styling the field container.                      |
| `fieldWrapperClassName` | `string`                                         | CSS class for the field wrapper.                                                 |
| `labelWrapperClassName` | `string`                                         | CSS class for the label wrapper.                                                 |
| `htmlFor`               | `string`                                         | Specifies the id of the form element the label should be bound to.               |
| `autoFocusOnMount`      | `boolean`                                        | If true, the input field will automatically gain focus when the component mounts |
