# Overview

The `ImageFile` component is designed to display and manage an individual image file within upload components.

# Props

| Name        | Type                               | Description                                                 |
| ----------- | ---------------------------------- | ----------------------------------------------------------- |
| `fileState` | `UploadFileState<{ src: string }>` | The state of the image file being managed.                  |
| `onDelete`  | `() => void`                       | Callback function triggered when the image file is deleted. |

# Usage

```tsx
import React from "react";
import { ImageFile } from "./ImageFile";
import { UploadFileState } from "./types";

const imageFile: UploadFileState<{ src: string }> = {
  file: new File(["content"], "image.png"),
  status: "uploaded",
  data: { src: "path/to/image.png" },
};

const handleDelete = () => {
  console.log("Deleting image:", imageFile.file.name);
};

const App = () => (
  <div>
    <h1>Single Image</h1>
    <ImageFile fileState={imageFile} onDelete={handleDelete} />
  </div>
);

export default App;
```
