# Overview

The `Button` component extends the functionality of the Ant Design Button component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Button component.

# Props

| Prop         | Type         | Default   | Description                                                    |
| ------------ | ------------ | --------- | -------------------------------------------------------------- |
| block        | `boolean`    | -         | Option to fit button width to its parent width.                |
| children     | `ReactNode`  | -         | Content to be rendered inside the button.                      |
| className    | `string`     | -         | Custom CSS class for styling the button.                       |
| disabled     | `boolean`    | -         | Disabled state of button.                                      |
| ghost        | `boolean`    | -         | Make background transparent and invert text and border colors. |
| href         | `string`     | -         | Redirect URL of link button.                                   |
| htmlType     | `string`     | 'button'  | Set the original HTML `type` of button.                        |
| icon         | `ReactNode`  | -         | Set the icon component of button.                              |
| iconPosition | `string`     | -         | Set the position of the icon in the button.                    |
| loading      | `boolean`    | false     | Set the loading state of button.                               |
| onClick      | `() => void` | -         | Set the handler to handle click event.                         |
| shape        | `string`     | -         | Can be set to `circle`, `round`, or omitted.                   |
| target       | `string`     | '\_blank' | Set the target of link button.                                 |
| form         | `string`     | -         | Associate the button with a form.                              |
| type         | `string`     | -         | Can be set to `button`, `text`, `link`.                        |
| color        | `Color`      | -         | Custom color for the button.                                   |
| size         | `string`     | -         | The size of button.                                            |

# Usage

```jsx
import { Button } from "path-to-Button";

// Example usage
<Button block danger disabled ghost href="https://example.com" htmlType="submit" icon={<IconComponent />} iconPosition="left" loading={true} onClick={handleClick} shape="round" target="_self" type="primary">
  Click Me
</Button>;
```
