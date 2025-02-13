# Overview

The `FixedProgressLoader` component is a React component designed to display a fixed progress loader at the top of a page, indicating the loading status. This loader is useful in scenarios where you want to visually represent ongoing processes or content loading.

# Props

# Props

| Prop                 | Type      | Description                                                                                 |
| -------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `done`               | `boolean` | Indicates whether the loading is complete or not.                                           |
| `duration`           | `number`  | Duration of the progress bar animation in milliseconds. Defaults to 300ms if not specified. |
| `containerClassName` | `string`  | Class name for the container element that wraps the progress bar.                           |
| `barClassName`       | `string`  | Class name for the progress bar element.                                                    |
| `hidden`             | `boolean` | Indicates whether the progress bar is hidden.                                               |
| `placementTop`       | `boolean` | Indicates whether the progress bar is placed at the top of the container.                   |
| `color`              | `string`  | Custom color for the progress bar.                                                          |
