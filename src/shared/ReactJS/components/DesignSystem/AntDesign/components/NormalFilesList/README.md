# Overview

The `NormalFilesList` component is designed to display and manage a list of normal files within upload components.

# Props

| Name         | Type                                        | Description                                            |
| ------------ | ------------------------------------------- | ------------------------------------------------------ |
| `filesState` | `UploadFileState<any>[]`                    | The current state of the files being managed.          |
| `onDownload` | `(fileState: UploadFileState<any>) => void` | Callback function triggered when a file is downloaded. |
| `onDelete`   | `(fileState: UploadFileState<any>) => void` | Callback function triggered when a file is deleted.    |

# Usage

```tsx
import React from "react";
import { NormalFilesList } from "./NormalFilesList";
import { UploadFileState } from "./types";

const files: UploadFileState<any>[] = [
  { file: new File(["content"], "example.txt"), status: "uploaded" },
  { file: new File(["content"], "document.pdf"), status: "uploaded" },
];

const handleDownload = (fileState: UploadFileState<any>) => {
  console.log("Downloading file:", fileState.file.name);
};

const handleDelete = (fileState: UploadFileState<any>) => {
  console.log("Deleting file:", fileState.file.name);
};

const App = () => (
  <div>
    <h1>File List</h1>
    <NormalFilesList filesState={files} onDownload={handleDownload} onDelete={handleDelete} />
  </div>
);

export default App;
```
