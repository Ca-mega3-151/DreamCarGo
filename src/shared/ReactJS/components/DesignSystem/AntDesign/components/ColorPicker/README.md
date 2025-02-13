# Overview

The `ColorPicker` component extends the functionality of the Ant Design ColorPicker component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design ColorPicker component.

# Props

| Prop          | Type                                         | Default              | Description                                                            |
| ------------- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| arrow         | `string`                                     | -                    | Arrow icon of the color picker.                                        |
| className     | `string`                                     | -                    | Custom CSS class for styling the color picker.                         |
| children      | `ReactNode`                                  | -                    | Content to be rendered inside the color picker.                        |
| disabled      | `boolean`                                    | `false`              | Disabled state of the color picker.                                    |
| disabledAlpha | `boolean`                                    | `false`              | Disable alpha channel of the color picker.                             |
| onOpenChange  | `() => void`                                 | -                    | Callback function when the open state of the panel changes.            |
| open          | `boolean`                                    | -                    | Control the open state of the color picker panel.                      |
| panelRender   | `() => ReactNode`                            | -                    | Custom render function for the color picker panel.                     |
| placement     | `string`                                     | -                    | Placement of the color picker panel.                                   |
| presets       | `Array`                                      | -                    | Preset colors for quick selection.                                     |
| size          | `string`                                     | -                    | Size of the color picker.                                              |
| text          | `(color: string) => ReactNode`               | `() => null`         | A function to render text based on the selected color.                 |
| value         | `string`                                     | `UndefinedValue`     | The current color value.                                               |
| onChange      | `(color: string \| undefined) => void`       | -                    | Callback function when the color value changes.                        |
| readOnly      | `boolean`                                    | `false`              | If true, the color picker will be read-only and not allow interaction. |
| valueVariant  | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the input is controlled or uncontrolled state.           |

# Usage

```jsx
import { ColorPicker } from "path-to-ColorPicker";

// Example usage
<ColorPicker arrow="up" className="custom-class" disabled disabledAlpha onOpenChange={() => console.log("Open state changed")} open={true} panelRender={() => <div>Custom Panel</div>} placement="topLeft" presets={["#000", "#fff", "#ff0000"]} size="large" text={(color) => <span>{color}</span>} value="#ff0000" onChange={(color) => console.log("Color changed:", color)} readOnly valueVariant="controlled-state" />;
```
