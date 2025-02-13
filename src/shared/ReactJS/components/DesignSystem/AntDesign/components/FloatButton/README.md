# Overview

The `FloatButton` component extends the functionality of the Ant Design FloatButton component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design FloatButton component.

# Props

| Prop      | Type                                                                                             | Default | Description                                               |
| --------- | ------------------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------- |
| onClick   | `function`                                                                                       | -       | The click handler for the main float button.              |
| shape     | `string`                                                                                         | -       | The shape of the float button (e.g., 'circle', 'square'). |
| children  | `ReactNode`                                                                                      | -       | The content to be rendered inside the main float button.  |
| items     | `Array<{ key: Key; children: ReactNode } & Pick<AntFloatButtonProps, 'onClick' \| 'className'>>` | -       | The items to be displayed in the float button group.      |
| closeIcon | `ReactNode`                                                                                      | -       | The custom close icon for the float button group.         |
| className | `string`                                                                                         | -       | Custom CSS class for styling the float button container.  |

# Usage

```jsx
import { FloatButton } from "path-to-FloatButton";

// Example usage
<FloatButton
  onClick={handleClick}
  shape="circle"
  className="custom-float-button"
  closeIcon={<CloseIcon />}
  items={[
    { key: "item1", children: <Item1Icon />, onClick: handleItem1Click, className: "item1-class" },
    { key: "item2", children: <Item2Icon />, onClick: handleItem2Click, className: "item2-class" },
  ]}
>
  <MainIcon />
</FloatButton>;
```
