# Overview

The `NormalFile` component is designed to display and manage an individual normal file within upload components.

# Props

| Name         | Type                            | Description                                              |
| ------------ | ------------------------------- | -------------------------------------------------------- |
| `fileState`  | `UploadFileState<FileResponse>` | The state of the file being managed.                     |
| `onDelete`   | `() => void`                    | Callback function triggered when the file is deleted.    |
| `onDownload` | `() => void`                    | Callback function triggered when the file is downloaded. |

# Usage

```tsx
import React from "react";
import { NormalFile } from "./NormalFile";
import { UploadFileState } from "./types";

const file: UploadFileState<{ url: string }> = {
  file: new File(["content"], "document.pdf"),
  status: "uploaded",
  data: { url: "path/to/document.pdf" },
};

const handleDelete = () => {
  console.log("Deleting file:", file.file.name);
};

const handleDownload = () => {
  console.log("Downloading file:", file.file.name);
};

const App = () => (
  <div>
    <h1>Single File</h1>
    <NormalFile fileState={file} onDelete={handleDelete} onDownload={handleDownload} />
  </div>
);

export default App;
```
