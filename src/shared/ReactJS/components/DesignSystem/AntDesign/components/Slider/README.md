# SingleSlider

## Overview

The `SingleSlider` component extends the functionality of the Ant Design Slider component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Slider component.

## Props

| Prop             | Type                                         | Default              | Description                                                         |
| ---------------- | -------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| className        | string                                       | -                    | Custom CSS class for styling the slider.                            |
| disabled         | boolean                                      | false                | Whether the slider is disabled.                                     |
| value            | number                                       | -                    | The value of the slider.                                            |
| onChange         | function                                     | -                    | Callback function triggered when the slider value changes.          |
| step             | number                                       | -                    | The granularity the slider can step through values.                 |
| min              | number                                       | 0                    | The minimum value the slider can slide to.                          |
| max              | number                                       | 100                  | The maximum value the slider can slide to.                          |
| vertical         | boolean                                      | false                | Whether the slider is vertical.                                     |
| direction        | 'ltr' \| 'rtl'                               | 'ltr'                | The direction of the slider.                                        |
| tooltipFormatter | Formatter                                    | -                    | Formatter function for the tooltip.                                 |
| hideCoordinative | boolean                                      | false                | Whether to hide the coordinative (the track of the slider).         |
| marks            | Record<number, ReactNode>                    | {}                   | Marks on the slider track.                                          |
| readOnly         | `boolean`                                    | `false`              | If true, the slider is read-only and cannot be changed by the user. |
| valueVariant     | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the slider is controlled or uncontrolled state.       |

## Usage

```jsx
import { SingleSlider } from "path/to/SingleSlider";

// Example usage
<SingleSlider className="custom-slider" disabled={false} value={50} onChange={(value) => console.log("Slider value:", value)} step={5} min={0} max={100} direction="ltr" tooltipFormatter={(value) => `${value}%`} hideCoordinative={false} vertical={false} marks={{ 0: "0%", 50: "50%", 100: "100%" }} />;
```

# RangeSlider

# Overview

The `RangeSlider` component extends the functionality of the Ant Design Slider component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Slider component.

## Props

| Prop             | Type                                         | Default              | Description                                                         |
| ---------------- | -------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| className        | string                                       | -                    | Custom CSS class for styling the slider.                            |
| disabled         | boolean                                      | false                | Whether the slider is disabled.                                     |
| value            | [number, number]                             | -                    | The value of the slider.                                            |
| onChange         | function                                     | -                    | Callback function triggered when the slider value changes.          |
| step             | number                                       | -                    | The granularity the slider can step through values.                 |
| min              | number                                       | 0                    | The minimum value the slider can slide to.                          |
| max              | number                                       | 100                  | The maximum value the slider can slide to.                          |
| vertical         | boolean                                      | false                | Whether the slider is vertical.                                     |
| direction        | 'ltr' \| 'rtl'                               | 'ltr'                | The direction of the slider.                                        |
| tooltipFormatter | Formatter                                    | -                    | Formatter function for the tooltip.                                 |
| hideCoordinative | boolean                                      | false                | Whether to hide the coordinative (the track of the slider).         |
| marks            | Record<number, ReactNode>                    | {}                   | Marks on the slider track.                                          |
| readOnly         | `boolean`                                    | `false`              | If true, the slider is read-only and cannot be changed by the user. |
| valueVariant     | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the slider is controlled or uncontrolled state.       |

## Usage

```jsx
import { RangeSlider } from "path/to/RangeSlider";

// Example usage
<RangeSlider className="custom-slider" disabled={false} value={[20, 50]} onChange={(value) => console.log("Slider value:", value)} step={5} min={0} max={100} direction="ltr" tooltipFormatter={(value) => `${value}%`} hideCoordinative={false} vertical={false} marks={{ 0: "0%", 50: "50%", 100: "100%" }} />;
```
