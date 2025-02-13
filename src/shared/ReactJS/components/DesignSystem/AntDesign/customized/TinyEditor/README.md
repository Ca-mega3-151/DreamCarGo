# Overview

The `TinyEditor` component is a customizable rich text editor built for React applications. It offers a range of features through plugins, configurable toolbars, and menu options, providing a versatile editing experience. The editor supports image uploads, sticky toolbars, and can be customized in terms of dimensions and behavior.

# Props

The `TinyEditor` component accepts the following props:

| Prop                     | Type                                                  | Default     | Description                                                                                              |
| ------------------------ | ----------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `plugins`                | `Plugin[]`                                            | `[]`        | An array of plugins to enhance the TinyEditor functionality.                                             |
| `toolbars`               | `Toolbar[][]`                                         | `[]`        | A 2D array representing the configuration of toolbars.                                                   |
| `quickSelectionToolbars` | `Toolbar[][]`                                         | `[]`        | A 2D array for configuring quick selection toolbars.                                                     |
| `menubar`                | `MenuBar[]`                                           | `[]`        | An array defining the items in the menu bar.                                                             |
| `toolbarSticky`          | `Toolbar`                                             | `undefined` | Configuration object for making a toolbar sticky.                                                        |
| `toolbarStickyOffset`    | `number`                                              | `undefined` | Offset value for the sticky toolbar, in pixels.                                                          |
| `disabled`               | `boolean`                                             | `false`     | Whether the editor is disabled, preventing user interactions.                                            |
| `readonly`               | `boolean`                                             | `false`     | Whether the editor is read-only, allowing content to be viewed but not edited.                           |
| `apiKey`                 | `string`                                              | -           | API key for authenticating with the TinyEditor service.                                                  |
| `value`                  | `string`                                              | `undefined` | The initial content value of the editor.                                                                 |
| `onChange`               | `(value: string \| undefined) => void`                | `undefined` | Callback function called when the content of the editor changes.                                         |
| `onDebounceChange`       | `(value: string \| undefined) => void`                | `undefined` | Callback function called with debounced changes to the editor content.                                   |
| `className`              | `string`                                              | `undefined` | Additional CSS class names to apply to the editor component.                                             |
| `height`                 | `string  \| number`                                   | `undefined` | The height of the editor.                                                                                |
| `width`                  | `string \| number`                                    | `undefined` | The width of the editor.                                                                                 |
| `minHeight`              | `number`                                              | `undefined` | The minimum height of the editor, in pixels.                                                             |
| `minWidth`               | `number`                                              | `undefined` | The minimum width of the editor, in pixels.                                                              |
| `maxHeight`              | `number`                                              | `undefined` | The maximum height of the editor, in pixels.                                                             |
| `maxWidth`               | `number`                                              | `undefined` | The maximum width of the editor, in pixels.                                                              |
| `placeholder`            | `string`                                              | `undefined` | Placeholder text for the input.                                                                          |
| `imagesUploadHandler`    | `Required<IAllProps>['init']['images_upload_handler]` | `undefined` | Handler function for managing image uploads within the editor.                                           |
| `contentStyle`           | `string`                                              | `undefined` | Custom content styles for the editor. Applied directly to the editor's content area.                     |
| `onLoadContent`          | `IAllProps['onLoadContent']`                          | `undefined` | Callback function invoked when content is loaded. Allows additional processing after the content is set. |

# Example Usage

```jsx
import React from "react";
import { TinyEditor } from "./TinyEditor";

const YourComponent = () => {
  const handleEditorChange = (value) => {
    console.log("Editor content:", value);
  };

  return <TinyEditor apiKey="your-api-key" plugins={[plugin1, plugin2]} toolbars={[[toolbar1, toolbar2], [toolbar3]]} quickSelectionToolbars={[[quickToolbar1]]} menubar={[menubar1, menubar2]} toolbarSticky={stickyToolbar} toolbarStickyOffset={10} disabled={false} readonly={true} value="Initial content" onChange={handleEditorChange} onDebounceChange={(value) => console.log("Debounced change:", value)} className="custom-class" height="400px" width="100%" minHeight={200} minWidth={300} maxHeight={600} maxWidth={800} imagesUploadHandler={yourImageUploadHandler} />;
};

export default YourComponent;
```
